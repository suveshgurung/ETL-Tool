from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings


sql_engine = create_engine(settings.SQL_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=sql_engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
