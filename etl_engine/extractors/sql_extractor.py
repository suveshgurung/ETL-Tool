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
            print(str(e))


if __name__ == "__main__":
    connection_config = {
        "dialect": "mysql",
        "driver": "pymysql",
        "username": "suvesh",
        "password": "test123",
        "host": "localhost",
        "database": "test"
    }
    extractor = SQLExtractor(connection_config)
    extractor.connect()
    schema = extractor.get_schema()
    print(schema)
    extractor.extract(connection_config)
