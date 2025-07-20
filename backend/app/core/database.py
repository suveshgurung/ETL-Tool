from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .config import settings
from app.models import Base

engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Function to create all tables
def create_tables():
    Base.metadata.create_all(bind=engine)
