import pandas as pd
from etl_engine.extractors.sql_extractor import SQLExtractor
from etl_engine.extractors.mongo_extractor import MongoExtractor
from etl_engine.transformers.faculty_transformer import FacultyTransformer
from etl_engine.transformers.research_transformer import ResearchTransformer
from typing import Dict, Any

def main():
    sql_extractor = SQLExtractor()
    mongo_extractor = MongoExtractor()
    faculty_transformer = FacultyTransformer()
    research_transformer = ResearchTransformer()

    # Extract data from SQL
    try:
        faculty_df, deparment_df, school_df = sql_extractor.extract()
        faculty_df = faculty_transformer.normalize_faculty_names(faculty_df)
    except Exception as e:
        print(f"SQL extraction failed: {e}")
        return

    # Extract data from MongoDB
    try:
        research_df = mongo_extractor.extract()
    except Exception as e:
        print(f"Mongo extraction failed: {e}")
        return

    # Transform the data
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

    print(enhanced_mapping)

if __name__ == "__main__":
    main()
