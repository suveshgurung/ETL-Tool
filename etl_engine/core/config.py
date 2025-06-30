import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings
from sqlalchemy import URL
from typing import ClassVar

load_dotenv()

class Settings(BaseSettings):
    # Database config
    url_object: ClassVar[URL] = URL.create(
        "mysql+pymysql",
        username=os.getenv("SQL_USER"),
        password=os.getenv("SQL_PASSWORD"),
        host="localhost",
        database=os.getenv("SQL_DATABASE")
    )
    DATABASE_URL: str = ""

    def model_post_init(self, __context) -> None:
        object.__setattr__(self, "DATABASE_URL", self.url_object)

settings = Settings()
