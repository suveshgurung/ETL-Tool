import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings
from sqlalchemy import URL
from typing import ClassVar

load_dotenv()

class Settings(BaseSettings):
    # SQL database config
    url_object: ClassVar[URL] = URL.create(
        "mysql+pymysql",
        username=os.getenv("SQL_USER"),
        password=os.getenv("SQL_PASSWORD"),
        host="localhost",
        database=os.getenv("SQL_DATABASE")
    )
    SQL_URL: str = ""

    # Mongodb
    MONGO_URL: str = os.getenv("MONGO_DB_URL")

    def model_post_init(self, __context) -> None:
        object.__setattr__(self, "SQL_URL", self.url_object)

settings = Settings()
