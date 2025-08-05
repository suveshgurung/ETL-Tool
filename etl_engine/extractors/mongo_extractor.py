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
        try:
            with get_mongo_db() as db:
                papers = []

                for doc in db.research_papers_v2.find():
                    for paper in doc['papers']:
                        first_name = None
                        middle_name = None
                        last_name = None
                        full_name = doc['faculty_name'].strip().split()

                        if len(full_name) == 2:
                            first_name = full_name[0]
                            last_name = full_name[1]
                        elif len(full_name) == 3:
                            first_name = full_name[0]
                            middle_name = full_name[1]
                            last_name = full_name[2]

                        paper_info = {
                            'faculty_id': doc['faculty_id'],
                            'first_name': first_name,
                            'middle_name': middle_name,
                            'last_name': last_name,
                            'department': doc['school'] if 'department' not in doc or doc['department'] in [None, "NULL"] else doc['department'],
                            'school': doc['school'],
                            'research_area': doc['research_area'],
                            'paper_title': paper['title'],
                            'published_year': paper['year'],
                            'journal': paper['journal'],
                            'coauthors': paper['co_authors']
                        }

                        papers.append(paper_info)

                if papers:
                    research_paper_df = pd.DataFrame(papers)
                    return research_paper_df
                else:
                    print("No research paper data found.")
                    return pd.DataFrame()

        except Exception as e:
            print(f"Extraction of research papers failed: {e}")
            return pd.DataFrame()
