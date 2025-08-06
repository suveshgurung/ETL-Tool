import pandas as pd
from etl_engine.extractors.sql_extractor import SQLExtractor
from etl_engine.extractors.mongo_extractor import MongoExtractor
from etl_engine.transformers.faculty_transformer import FacultyTransformer
from etl_engine.transformers.research_transformer import ResearchTransformer
from etl_engine.loaders.postgres_loader import PostgreSQLLoader
from typing import Dict, Any
import sys
import os

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

def run_api_server():
    """Start the FastAPI server for data access through API."""
    try:
        import uvicorn
        from etl_engine.api.main import app
        print("Starting API server on http://localhost:8000...")
        uvicorn.run(app, host="0.0.0.0", port=8000)
    except Exception as e:
        print(f"Failed to start the API server: {e}")

def run_dashboard_server():
    """Start the backend dashboard server"""
    try:
        from etl_engine.dashboard.backend import app
        print("Starting the Dashboard backend server on http://localhost:5000")
        app.run(debug=True, host='0.0.0.0', port=5000)
    except Exception as e:
        print(f"Failed to start dashboard server: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        command = sys.argv[1]

        if command == "api":
            run_api_server()
        elif command == "dashboard":
            run_dashboard_server()
        elif command == "etl":
            main()
        else:
            print("Usage: python3 -m etl_engine.main [etl|api|dashboard]")
    else:
        main()
