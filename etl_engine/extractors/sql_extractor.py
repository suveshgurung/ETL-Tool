from sqlalchemy import text
import pandas as pd
from .base_extractor import BaseExtractor
from etl_engine.models.faculty_model import Faculty
from etl_engine.models.department_model import Department
from etl_engine.models.school_model import School
from etl_engine.core.sql_database import get_sql_db


class SQLExtractor(BaseExtractor):
    def connect(self) -> bool:
        try:
            # Test the connection.
            with get_sql_db() as db:
                query = text("SELECT 1;")
                result = db.execute(query)
                _ = result.fetchone()
            return True
        except Exception as e:
            print(f"Connection failed: {e}")
            return False

    def extract(self) -> tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame]:
        faculty_df = self.__extract_faculty_information()
        department_df = self.__extract_department_information()
        school_df = self.__extract_school_information()

        # School of management and school of arts does not have departments. so use school instead.
        faculty_df['department_name'] = faculty_df.apply(
            lambda row: row['school_name'] if pd.isna(row['department_name']) else row['department_name'],
            axis=1
        )

        return faculty_df, department_df, school_df

    def __extract_faculty_information(self) -> pd.DataFrame:
        try:
            with get_sql_db() as db:
                faculties = db.query(Faculty).all()
                faculty_data = [faculty.as_dict() for faculty in faculties]
                faculty_df = pd.DataFrame(faculty_data)
                return faculty_df
        except Exception as e:
            print(f"Extraction of faculty information failed: {e}")
            return pd.DataFrame()

    def __extract_department_information(self) -> pd.DataFrame:
        try:
            with get_sql_db() as db:
                departments = db.query(Department).all()
                department_data = [department.as_dict() for department in departments]
                department_df = pd.DataFrame(department_data)
                return department_df
        except Exception as e:
            print(f"Extraction of department information failed: {e}")
            return pd.DataFrame()

    def __extract_school_information(self) -> pd.DataFrame:
        try:
            with get_sql_db() as db:
                schools = db.query(School).all()
                school_data = [school.as_dict() for school in schools]
                school_df = pd.DataFrame(school_data)
                return school_df
        except Exception as e:
            print(f"Extraction of school information failed: {e}")
            return pd.DataFrame()
