import pandas as pd
from pymongo.errors import ServerSelectionTimeoutError
from .base_extractor import BaseExtractor
from etl_engine.core.mongo_database import get_mongo_db, client


class MongoExtractor(BaseExtractor):
    def connect(self) -> bool:
        try:
            server_info = client.server_info()
            return True
        except ServerSelectionTimeoutError as e:
            print(f"Connection failed: {e}")
            return False

    def extract(self) -> pd.DataFrame:
        department_df = self.__extract_department_information()
        school_df = self.__extract_school_information()
        research_df = self.__extract_research_papers()

        return research_df

    def __extract_research_papers(self) -> pd.DataFrame:
        try:
            with get_mongo_db() as db:
                research_cursor = db.research_papers.find()
                research_list = list(research_cursor)

                if research_list:
                    research_df = pd.DataFrame(research_list)
                    research_df.drop(columns=["_id"], inplace=True)
                    return research_df
                else:
                    print("No research data found.")
                    return pd.DataFrame()
        except Exception as e:
            print(f"Extraction of research papers failed: {e}")
            return pd.DataFrame()

    def __extract_department_information(self) -> pd.DataFrame:
        try:
            with get_mongo_db() as db:
                departments_cursor = db.departments.find()
                departments_list = list(departments_cursor)

                if departments_list:
                    department_df = pd.DataFrame(departments_list)
                    department_df.drop(columns=["_id"], inplace=True)
                    return department_df
                else:
                    print("No department data found.")
                    return pd.DataFrame()
        except Exception as e:
            print(f"Extraction of department information failed: {e}")
            return pd.DataFrame()

    def __extract_school_information(self) -> pd.DataFrame:
        try:
            with get_mongo_db() as db:
                schools_cursor = db.schools.find()
                schools_list = list(schools_cursor)

                if schools_list:
                    school_df = pd.DataFrame(schools_list)
                    school_df.drop(columns=["_id"], inplace=True)

                    return school_df
        except Exception as e:
            print(f"Extraction of school information failed: {e}")
            return pd.DataFrame()


mongo = MongoExtractor()
if mongo.connect():
    mongo.extract()
else:
    print("Fail")
