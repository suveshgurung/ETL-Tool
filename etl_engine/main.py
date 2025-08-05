import pandas as pd
from etl_engine.extractors.sql_extractor import SQLExtractor
from etl_engine.extractors.mongo_extractor import MongoExtractor
from etl_engine.transformers.faculty_transformer import FacultyTransformer
from etl_engine.transformers.research_transformer import ResearchTransformer
from etl_engine.loaders.postgres_loader import PostgreSQLLoader
from typing import Dict, Any

def main():
    print("Starting ETL Process...")

    sql_extractor = SQLExtractor()
    mongo_extractor = MongoExtractor()
    faculty_transformer = FacultyTransformer()
    research_transformer = ResearchTransformer()
    postgres_loader = PostgreSQLLoader()

    # Test database connections
    if not sql_extractor.connect():
        print("SQL connection failed")
        return
    
    if not mongo_extractor.connect():
        print("MongoDB connection failed")
        return

    if not postgres_loader.test_connection():
        print("PostgreSQL connection failed")
        return

    # Extract data from SQL
    print("Extracting data from SQL...")
    try:
        faculty_df, deparment_df, school_df = sql_extractor.extract()
        print(f"Extracted {len(faculty_df)} faculty records")

        # Normalize faculty names
        faculty_df = faculty_transformer.normalize_faculty_names(faculty_df)
    except Exception as e:
        print(f"SQL extraction failed: {e}")
        return

    # Extract data from MongoDB
    print("Extracting data from MongoDB...")
    try:
        research_df = mongo_extractor.extract()
        print(f"Extracted {len(research_df)} research paper records")
    except Exception as e:
        print(f"MongoDB extraction failed: {e}")
        return

    # Transform the data
    print("Transforming data...")
    try:
        faculty_analysis = faculty_transformer.transform_facutly_data(faculty_df)
        research_analysis = research_transformer.transform_research_data(research_df)

        # Create faculty-research mapping
        research_by_faculty = research_transformer.get_research_areas_by_faculty(research_df)
        # print(research_by_faculty)

        faculty_details = faculty_df.set_index('faculty_id').to_dict('index')
        enhanced_mapping = {}

        for faculty_id, research_area in research_by_faculty.items():
            if int(faculty_id) in faculty_details:
                faculty_id_int = int(faculty_id)
                enhanced_mapping[faculty_id] = {
                    'research_areas': research_area,
                    'department': faculty_details[faculty_id_int].get('department_name'),
                    'school': faculty_details[faculty_id_int].get('school_name'),
                    'position': faculty_details[faculty_id_int].get('position', ''),
                }

    except Exception as e:
        print(f"Data transformation failed: {e}")
        return
    
    # Load to PostgreSQL
    print("Loading data to PostgreSQL...")
    try:
        # Create tables
        postgres_loader.create_tables()

        # Load faculty and research area data
        postgres_loader.load_faculty_data(faculty_df, research_by_faculty)

        # Load publications data
        postgres_loader.load_publication_data(research_df)

        # Load analytics data
        postgres_loader.load_analytics_data(faculty_analysis, research_analysis)
    
    except Exception as e:
        print(f"PostgreSQL loading failed: {e}")
        return

if __name__ == "__main__":
    main()
