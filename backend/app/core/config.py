# backend/app/core/config.py
from pydantic_settings import BaseSettings
from pydantic import validator
import os


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = (
        "postgresql://sarbesh_user:your_password_here@localhost/sarbesh_etl"
    )

    # JWT
    SECRET_KEY: str = "de1d4f0f0198d6c3eb0ef39eeb74bf00efdd438538fed97128d4515eafd6948d"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # App
    APP_NAME: str = "College ETL"

    # CORS
    BACKEND_CORS_ORIGINS: list = ["http://localhost:3000", "http://localhost:8080"]

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
