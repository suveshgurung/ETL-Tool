import pandas as pd
from etl_engine.extractors.sql_extractor import SQLExtractor
from etl_engine.extractors.mongo_extractor import MongoExtractor
from collections import Counter
import json
from typing import Dict, Any

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


if __name__ == "__main__":
    main()
