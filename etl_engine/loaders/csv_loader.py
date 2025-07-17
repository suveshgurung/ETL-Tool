import csv
from etl_engine.extractors.sql_extractor import sql


def csv_loader(department_df, school_df):
    department_df.to_csv("derpartment_details.csv")
    school_df.to_csv("school_details.csv")


if __name__ == "__main__":
    if sql.connect():
        faculty_df, department_df, school_df = sql.extract()
    csv_loader(department_df, school_df)
