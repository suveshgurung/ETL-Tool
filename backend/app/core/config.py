from dotenv import load_dotenv
import os
from sqlalchemy import URL
from pydantic_settings import BaseSettings
from typing import Optional, ClassVar

load_dotenv()


class Settings(BaseSettings):
    # Database config
    url_object: ClassVar[URL] = URL.create(
        "mysql+pymysql",
        username=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host="localhost",
        database=os.getenv("DB_DATABASE")
    )
    DATABASE_URL: str = ""

    # Security config
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ENCRYPTION_KEY: Optional[str] = None

    def model_post_init(self, __context) -> None:
        object.__setattr__(self, "DATABASE_URL", self.url_object)


settings = Settings()
