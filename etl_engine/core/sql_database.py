from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from contextlib import contextmanager
from .config import settings

sql_engine = create_engine(settings.SQL_URL)
session_local = sessionmaker(autocommit=False, autoflush=False, bind=sql_engine)
Base = declarative_base()


@contextmanager
def get_sql_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()
