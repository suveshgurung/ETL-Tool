from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError, OperationFailure
import pandas as pd
from typing import Dict, Any, List
from datetime import datetime
from .base_extractor import BaseExtractor


class MongoDBExtractor(BaseExtractor):
    def connect(self) -> bool:
        """Establish MongoDB connection"""
        try:
            # Check if connection_string is provided directly (for Atlas connections)
            if "connection_string" in self.connection_config:
                connection_string = self.connection_config["connection_string"]
                # Replace <db_password> placeholder if password is provided separately
                if "<db_password>" in connection_string and "password" in self.connection_config:
                    connection_string = connection_string.replace("<db_password>", self.connection_config["password"])
                
                # Extract database name from connection_string or use provided database
                database = self.connection_config.get("database")
                if not database:
                    # Try to extract database from connection string if present
                    if "mongodb+srv://" in connection_string and "/" in connection_string.split("@")[1]:
                        parts = connection_string.split("@")[1].split("/")
                        if len(parts) > 1 and "?" in parts[1]:
                            database = parts[1].split("?")[0]
                        elif len(parts) > 1:
                            database = parts[1]
            else:
                # Traditional connection method
                host = self.connection_config.get("host", "localhost")
                port = self.connection_config.get("port", 27017)
                database = self.connection_config["database"]
                username = self.connection_config.get("username")
                password = self.connection_config.get("password")
                
                # Build connection string
                if username and password:
                    connection_string = f"mongodb://{username}:{password}@{host}:{port}/{database}"
                else:
                    connection_string = f"mongodb://{host}:{port}/{database}"
            
            # Create MongoDB client
            self.client = MongoClient(
                connection_string,
                serverSelectionTimeoutMS=5000  # 5 second timeout
            )
            
            # Set database reference
            if database:
                self.connection = self.client[database]
            else:
                # Use default database from client
                self.connection = self.client.get_default_database()
            
            # Test the connection
            self.client.admin.command('ping')
            
            return True
            
        except ConnectionFailure as e:
            print(f"Failed to connect to MongoDB: Connection failed - {str(e)}")
            return False
        except ServerSelectionTimeoutError as e:
            print(f"Failed to connect to MongoDB: Server selection timeout - {str(e)}")
            return False
        except OperationFailure as e:
            print(f"Failed to connect to MongoDB: Authentication failed - {str(e)}")
            return False
        except Exception as e:
            print(f"Failed to connect to MongoDB: {str(e)}")
            return False

    def extract_graduation_records(self) -> pd.DataFrame:
        """Extract graduation records from MongoDB database"""
        try:
            collection = self.connection["graduation_records"]
            
            # Query for graduation records from 1994 onwards
            pipeline = [
                {
                    "$match": {
                        "graduation_date": {"$gte": datetime(1994, 1, 1)}
                    }
                },
                {
                    "$project": {
                        "alumni_id": "$university_registration_number",
                        "first_name": 1,
                        "last_name": 1,
                        "email": 1,
                        "graduation_date": 1,
                        "degree_program": 1,
                        "department": 1,
                        "gpa": 1,
                        "honors": 1,
                        "thesis_title": 1,
                        "_id": 0
                    }
                },
                {
                    "$sort": {"graduation_date": -1}
                }
            ]
            
            cursor = collection.aggregate(pipeline)
            records = list(cursor)
            
            if not records:
                return pd.DataFrame()
            
            df = pd.DataFrame(records)
            
            # Convert graduation date to year
            if 'graduation_date' in df.columns:
                df['graduation_year'] = pd.to_datetime(df['graduation_date']).dt.year
            
            return df
            
        except Exception as e:
            print(f"Error extracting graduation records: {str(e)}")
            raise

    def extract_course_performance(self) -> pd.DataFrame:
        """Extract course performance data"""
        try:
            collection = self.connection["course_performance"]
            
            # Join with courses collection using aggregation pipeline
            pipeline = [
                {
                    "$match": {
                        "year": {"$gte": 1994}
                    }
                },
                {
                    "$lookup": {
                        "from": "courses",
                        "localField": "course_code",
                        "foreignField": "course_code",
                        "as": "course_info"
                    }
                },
                {
                    "$unwind": "$course_info"
                },
                {
                    "$project": {
                        "alumni_id": "$student_id",
                        "course_code": 1,
                        "course_name": "$course_info.course_name",
                        "department": "$course_info.department",
                        "grade": 1,
                        "credit_hours": 1,
                        "semester": 1,
                        "year": 1,
                        "_id": 0
                    }
                }
            ]
            
            cursor = collection.aggregate(pipeline)
            records = list(cursor)
            
            if not records:
                return pd.DataFrame()
            
            df = pd.DataFrame(records)
            return df
            
        except Exception as e:
            print(f"Error extracting course performance: {str(e)}")
            raise

    def extract_internship_data(self) -> pd.DataFrame:
        """Extract internship and placement data"""
        try:
            # Extract from internships collection
            internships_collection = self.connection["internships"]
            internships_cursor = internships_collection.find({}, {
                "_id": 0,
                "alumni_id": "$student_id",
                "company_name": 1,
                "position_title": 1,
                "internship_type": 1,
                "start_date": 1,
                "end_date": 1,
                "stipend": 1,
                "location": 1,
                "industry": 1,
                "mentor_name": 1,
                "performance_rating": 1
            })
            
            internships_data = list(internships_cursor)
            
            # Extract from placements collection
            placements_collection = self.connection["placements"]
            placements_pipeline = [
                {
                    "$project": {
                        "alumni_id": "$student_id",
                        "company_name": 1,
                        "position_title": 1,
                        "internship_type": {"$literal": "full_time"},
                        "start_date": 1,
                        "end_date": {"$literal": None},
                        "stipend": "$salary",
                        "location": 1,
                        "industry": 1,
                        "mentor_name": {"$literal": None},
                        "performance_rating": {"$literal": None},
                        "_id": 0
                    }
                }
            ]
            
            placements_cursor = placements_collection.aggregate(placements_pipeline)
            placements_data = list(placements_cursor)
            
            # Combine both datasets
            combined_data = internships_data + placements_data
            
            if not combined_data:
                return pd.DataFrame()
            
            df = pd.DataFrame(combined_data)
            return df
            
        except Exception as e:
            print(f"Error extracting internship data: {str(e)}")
            raise

    def extract(self, query_config: Dict[str, Any]) -> pd.DataFrame:
        """Extract data according to the provided information from the user"""
        if not self.connection:
            self.connect()
        
        """
        Expected query_config format:
        {
            "collections": [
                "collection1",
                "collection2",
                "collection3"
            ],
            "fields": {
                "collection1": ["field1", "field2", ...],
                "collection2": ["field1", "field2", ...],
                "collection3": ["field1", "field2", ...]
            },
            "filters": {
                "collection1": {"field": "value"},
                "collection2": {"field": {"$gte": value}}
            }
        }
        """
        
        collections = query_config.get("collections", [])
        fields = query_config.get("fields", {})
        filters = query_config.get("filters", {})
        
        try:
            all_data = []
            
            for collection_name in collections:
                collection = self.connection[collection_name]
                
                # Build projection
                projection = {"_id": 0}  # Exclude _id by default
                if collection_name in fields and fields[collection_name]:
                    for field in fields[collection_name]:
                        projection[field] = 1
                
                # Build filter
                filter_query = filters.get(collection_name, {})
                
                # Execute query
                cursor = collection.find(filter_query, projection)
                records = list(cursor)
                
                if records:
                    df = pd.DataFrame(records)
                    df['source_collection'] = collection_name  # Add source identifier
                    all_data.append(df)
            
            # Combine all data
            if all_data:
                combined_df = pd.concat(all_data, ignore_index=True, sort=False)
                return combined_df
            else:
                return pd.DataFrame()
                
        except Exception as e:
            print(f"An unexpected error occurred: {str(e)}")
            raise

    def get_schema(self) -> Dict[str, Any]:
        """Get schema information of the MongoDB database"""
        if not self.connection:
            self.connect()
        
        try:
            schema_info = {}
            
            # Get all collection names
            collection_names = self.connection.list_collection_names()
            
            for collection_name in collection_names:
                collection = self.connection[collection_name]
                
                # Sample a few documents to infer schema
                sample_docs = list(collection.find().limit(10))
                
                if sample_docs:
                    # Get all unique fields from sample documents
                    all_fields = set()
                    field_types = {}
                    
                    for doc in sample_docs:
                        for field, value in doc.items():
                            if field != '_id':  # Skip _id field
                                all_fields.add(field)
                                
                                # Infer field type
                                field_type = type(value).__name__
                                if field in field_types:
                                    # If we've seen this field before, keep the most general type
                                    if field_types[field] != field_type:
                                        field_types[field] = 'mixed'
                                else:
                                    field_types[field] = field_type
                    
                    # Build schema for this collection
                    schema_info[collection_name] = []
                    for field in sorted(all_fields):
                        schema_info[collection_name].append({
                            'field_name': field,
                            'data_type': field_types.get(field, 'unknown')
                        })
                else:
                    schema_info[collection_name] = []
            
            return schema_info
            
        except Exception as e:
            print(f"Error getting schema: {str(e)}")
            raise

    def disconnect(self):
        """Close MongoDB connection"""
        if hasattr(self, 'client') and self.client:
            self.client.close()
            self.client = None
            self.connection = None


if __name__ == "__main__":
    # Example for traditional MongoDB connection
    # connection_config = {
    #     "host": "localhost",
    #     "port": 27017,
    #     "database": "dummy_KU_records",
    #     "username": "suvesh",  # Optional
    #     "password": "test123"  # Optional
    # }
    
    # Example for MongoDB Atlas connection
    connection_config = {
        "connection_string": "mongodb+srv://weebmaniac2314:<db_password>@etldevelopement.ku7vykv.mongodb.net/?retryWrites=true&w=majority&appName=etlDevelopement",
        "password": "your_actual_password",  # Replace with actual password
        "database": "dummy_KU_records"  # Specify your database name
    }
    
    extractor = MongoDBExtractor(connection_config)
    
    if extractor.connect():
        print("Connected successfully!")
        
        # Test schema extraction
        schema = extractor.get_schema()
        print("Database Schema:")
        for collection, fields in schema.items():
            print(f"\nCollection: {collection}")
            for field_info in fields:
                print(f"  - {field_info['field_name']}: {field_info['data_type']}")
        
        # Test data extraction
        try:
            graduation_records = extractor.extract_graduation_records()
            print(f"\nGraduation records shape: {graduation_records.shape}")
            
            course_performance = extractor.extract_course_performance()
            print(f"Course performance shape: {course_performance.shape}")
            
            internship_data = extractor.extract_internship_data()
            print(f"Internship data shape: {internship_data.shape}")
            
        except Exception as e:
            print(f"Error during data extraction: {str(e)}")
        
        extractor.disconnect()
    else:
        print("Failed to connect to MongoDB")
        
       