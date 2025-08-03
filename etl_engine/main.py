import pandas as pd
from etl_engine.extractors.sql_extractor import SQLExtractor
from etl_engine.extractors.mongo_extractor import MongoExtractor
from collections import Counter
import json
from typing import Dict, Any

def normalize_name(faculty_row: pd.Series) -> str:
    parts = [faculty_row.first_name, faculty_row.middle_name or "", faculty_row.last_name]
    return " ".join(p.strip() for p in parts if p).lower()

def build_faculty_dataframe(sql_extractor: SQLExtractor) -> tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    if not sql_extractor.connect():
        raise RuntimeError("Cannot connect to SQL database.")

    faculty_df, department_df, school_df = sql_extractor.extract()
    return faculty_df, department_df, school_df

def main():
    sql_extractor = SQLExtractor()
    mongo_extractor = MongoExtractor()

    # Extract
    try:
        faculty_df, deparment_df, school_df = sql_extractor.extract()
    except Exception as e:
        print(f"SQL extraction failed: {e}")
        return

    try:
        research_df = mongo_extractor.extract()
    except Exception as e:
        print(f"Mongo extraction failed: {e}")
        return

    print(faculty_df)
    print(deparment_df)
    print(school_df)
    print(research_df)


if __name__ == "__main__":
    main()
