from sqlalchemy import URL, create_engine, text
from sqlalchemy.exc import OperationalError
import pymysql.err
import pandas as pd
from typing import Dict, Any
from .base_extractor import BaseExtractor


class SQLExtractor(BaseExtractor):
    def connect(self) -> bool:
        """Establish SQL connection"""
        try:
            dialect = self.connection_config["dialect"]
            driver = self.connection_config["driver"]
            username = self.connection_config["username"]
            password = self.connection_config["password"]
            host = self.connection_config["host"]
            database = self.connection_config["database"]

            # create the url for initializing the sql engine.
            url_object = URL.create(
                dialect + "+" + driver,
                username=username,
                password=password,
                host=host,
                database=database,
            )

            self.connection = create_engine(url_object)

            # Test the provided credentials.
            with self.connection.connect() as conn:
                pass

            return True

        except OperationalError as e:
            orig = e.orig
            if isinstance(orig, pymysql.err.OperationalError):
                error_code = orig.args[0]
                if error_code == 1045:
                    print("Access denied: Invalid username or password.")
                elif error_code == 2003:
                    print("Can't connect to MySQL server (invalid host or port).")
                elif error_code == 1049:
                    print("Unknown database.")
                else:
                    print(f"MySQL OperationalError [{error_code}]: {orig}")
            else:
                print(f"Database OperationalError: {str(e)}")

        except Exception as e:
            print(f"Failed to connect to MySQL: {str(e)}")

    def extract_graduation_records(self) -> pd.DataFrame:
        """Extract graduation records from SQL database"""
        try:
            query = """
            SELECT
                university_registration_number as alumni_id,
                first_name,
                last_name,
                email,
                graduation_date,
                degree_program,
                department,
                gpa,
                honors,
                thesis_title
            FROM graduation_records
            WHERE graduation_date >= '1994-01-01'
            ORDER BY graduation_date DESC
            """

            df = pd.read_sql(query, self.connection)

            # Convert graduation date to year
            df['graduation_year'] = df['graduation_date'].dt.year

            return df
        except Exception as e:
            raise

    def extract_course_performance(self) -> pd.DataFrame:
        """Extract course performance data"""
        try:
            query = """
            SELECT
                cp.student_id AS alumni_id,
                c.course_code,
                c.course_name,
                c.department,
                cp.grade,
                cp.credit_hours,
                cp.semester,
                cp.year
            FROM course_performance cp
            JOIN courses c ON cp.course_code = c.course_code
            WHERE cp.year >= 1994
            """

            df = pd.read_sql(query, self.connection)

            return df
        except Exception as e:
            raise

    def extract_internship_data(self) -> pd.DataFrame:
        """Extract internship and placement data"""
        try:
            query = """
            SELECT
                student_id as alumni_id,
                company_name,
                position_title,
                internship_type,
                start_date,
                end_date,
                stipend,
                location,
                industry,
                mentor_name,
                performance_rating
            FROM internships
            UNION ALL
            SELECT
                student_id as alumni_id
                company_name,
                position_title,
                'full_time' as internship_type
                start_date
                NULL as end_date
                salary as stipend
                location,
                industry,
                NULL as mentor_name,
                NULL as performance_rating
            FROM placements
            """

            df = pd.read_sql(query, self.connection)

            return df
        except Exception as e:
            raise

    def extract(self, query_config: Dict[str, Any]) -> pd.DataFrame:
        """Extract data according to the provided information from the user"""
        if not self.connection:
            self.connect()

        """
        {
            "tables": [
                ABCD,
                EFGH,
                IJKL
            ],
            "columns": {
                "ABCD": [Name, Age, ...],
                "EFGH": [OrderId, Amount, ...],
                "IJKL": [qrcode, ...]
            }
        }
        """
        tables = query_config.get("tables")
        # by defalt select all columns.
        columns = query_config.get("columns", {"*": "*"})

        try:
            with self.connection.connect() as conn:
                result = conn.execute(text("""SELECT * FROM Orders"""))
                print(result)

        except Exception as e:
            print(f"An unexpected error occured: {str(e)}")

    def get_schema(self) -> Dict[str, Any]:
        """Get schema information of the provided database"""
        if not self.connection:
            self.connect()

        try:
            with self.connection.connect() as conn:
                result = conn.execute(text("""SELECT table_name, column_name, data_type
                                  FROM information_schema.columns
                                  WHERE table_schema = 'test'
                                  ORDER BY table_name, ordinal_position"""))

                schema_info = {}
                for row in result:
                    table_name, column_name, data_type = row
                    if table_name not in schema_info:
                        schema_info[table_name] = []
                    schema_info[table_name].append({
                        'column_name': column_name,
                        'data_type': data_type
                    })

                return schema_info
        except Exception as e:
            raise


if __name__ == "__main__":
    connection_config = {
        "dialect": "mysql",
        "driver": "pymysql",
        "username": "suvesh",
        "password": "test123",
        "host": "localhost",
        "database": "dummy_KU_records"
    }
    extractor = SQLExtractor(connection_config)
    extractor.connect()
    graduation_records = extractor.extract_graduation_records()
    print(graduation_records)
    course_performance = extractor.extract_course_performance()
    print(course_performance)
