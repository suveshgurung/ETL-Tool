import pandas as pd
from sqlalchemy import create_engine, text, Column, Integer, String, Text, ForeignKey, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from contextlib import contextmanager
from typing import Dict, Any, List
import os
from dotenv import load_dotenv

load_dotenv()

POSTGRES_URL = f"postgresql://postgres:test123@localhost:5432/etl_data"

postgres_engine = create_engine(POSTGRES_URL)
PostgresSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=postgres_engine)
PostgresBase = declarative_base()

faculty_research_areas = Table(
    'faculty_research_area',
    PostgresBase.metadata,
    Column('faculty_id', Integer, ForeignKey('analytics_faculty.faculty_id'), primary_key=True),
    Column('research_area_id', Integer, ForeignKey('research_areas.id'), primary_key=True)
)

class AnalyticsFaculty(PostgresBase):
    __tablename__ = "analytics_faculty"

    faculty_id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(50), nullable=False)
    middle_name = Column(String(50), nullable=True)
    last_name = Column(String(50), nullable=False)
    normalized_name = Column(String(200), nullable=False, index=True)
    department_name = Column(String(100), nullable=True)
    school_name = Column(String(100), nullable=False)
    position = Column(String(50), nullable=False, index=True)

    # Relationships
    research_areas = relationship("ResearchArea", secondary=faculty_research_areas, back_populates="faculties")
    publications = relationship("Publication", back_populates="faculty")

class ResearchArea(PostgresBase):
    __tablename__ = "research_areas"

    id = Column(Integer, primary_key=True, index=True)
    area_name = Column(String(200), unique=True, nullable=False, index=True)

    # Relationships
    faculties = relationship("AnalyticsFaculty", secondary=faculty_research_areas, back_populates="research_areas")

class Publication(PostgresBase):
    __tablename__ = "publicaionts"

    id = Column(Integer, primary_key=True, index=True)
    faculty_id = Column(Integer, ForeignKey("analytics_faculty.faculty_id"), nullable=False)
    paper_title = Column(Text, nullable=False)
    published_year = Column(Integer, nullable=False, index=True)
    journal = Column(String(300), nullable=True)
    coauthors = Column(Text, nullable=True)
    
    # Relationships
    faculty = relationship("AnalyticsFaculty", back_populates="publications")

class FacultyAnalytics(PostgresBase):
    __tablename__ = "faculty_analytics"

    id = Column(Integer, primary_key=True, index=True)
    metric_name = Column(String(100), nullable=False)
    metric_value = Column(String(100), nullable=False)
    count = Column(Integer, nullable=False)

class ResearchAnalytics(PostgresBase):
    __tablename__ = "research_analytics"
    
    id = Column(Integer, primary_key=True, index=True)
    metric_name = Column(String(100), nullable=False)
    metric_value = Column(String(200), nullable=False)
    count = Column(Integer, nullable=False)

@contextmanager
def get_postgres_db():
    db = PostgresSessionLocal()
    try:
        yield db
    finally:
        db.close()

class PostgreSQLLoader:
    def __init__(self):
        self.engine = postgres_engine

    def create_tables(self):
        """Create all tables in PostgreSQL"""
        PostgresBase.metadata.create_all(bind=self.engine)

    def load_faculty_data(self, faculty_df: pd.DataFrame, research_by_faculty: Dict[str, List[str]]):
        """Load faculty data and their research areas"""
        with get_postgres_db() as db:
            # Clear existing data
            db.query(AnalyticsFaculty).delete()
            db.query(ResearchArea).delete()
            db.query(Publication).delete()

            all_research_areas = set()
            for areas in research_by_faculty.values():
                all_research_areas.update(areas)

            research_area_objects = []
            for area in all_research_areas:
                research_area_objects.append(ResearchArea(area_name=area))

            db.add_all(research_area_objects)
            db.commit()

            research_area_map = {ra.area_name: ra.id for ra in db.query(ResearchArea).all()}

            for _, row in faculty_df.iterrows():
                faculty = AnalyticsFaculty(
                    faculty_id=row['faculty_id'],
                    first_name=row['first_name'],
                    middle_name=row.get('middle_name'),
                    last_name=row['last_name'],
                    normalized_name=row['normalized_name'],
                    department_name=row['department_name'],
                    school_name=row['school_name'],
                    position=row['position']
                )

                # Add research area for this faculty.
                faculty_id_str = str(row['faculty_id'])
                if faculty_id_str in research_by_faculty:
                    for area_name in research_by_faculty[faculty_id_str]:
                        if area_name in research_area_map:
                            area = db.query(ResearchArea).filter(ResearchArea.id == research_area_map[area_name]).first()
                            if area:
                                faculty.research_areas.append(area)

                db.add(faculty)

            db.commit()
            print(f"Loaded {len(faculty_df)} faculty members")

    def load_publication_data(self, research_df: pd.DataFrame):
        """Load publication data"""
        with get_postgres_db() as db:
            publications = []
            for _, row in research_df.iterrows():
                publication = Publication(
                    faculty_id=row['faculty_id'],
                    paper_title=row['paper_title'],
                    published_year=row['published_year'],
                    journal=row.get('journal'),
                    coauthors=str(row.get('coauthors', ''))
                )
                publications.append(publication)
            
            db.add_all(publications)
            db.commit()
            print(f"Loaded {len(publications)} publication records")

    def load_analytics_data(self, faculty_analysis: Dict[str, Any], research_analysis: Dict[str, Any]):
        """Load pre-computed analytics data"""
        with get_postgres_db() as db:
            # Clear existing analytics
            db.query(FacultyAnalytics).delete()
            db.query(ResearchAnalytics).delete()
            
            # Load faculty analytics
            faculty_analytics = []
            
            # Position counts
            for position, count in faculty_analysis.get('positions_counts', {}).items():
                faculty_analytics.append(FacultyAnalytics(
                    metric_name='position',
                    metric_value=position,
                    count=count
                ))
            
            # Department counts
            for dept, count in faculty_analysis.get('department_counts', {}).items():
                faculty_analytics.append(FacultyAnalytics(
                    metric_name='department',
                    metric_value=dept,
                    count=count
                ))
            
            # School counts
            for school, count in faculty_analysis.get('school_counts', {}).items():
                faculty_analytics.append(FacultyAnalytics(
                    metric_name='school',
                    metric_value=school,
                    count=count
                ))
            
            db.add_all(faculty_analytics)
            
            # Load research analytics
            research_analytics = []
            
            # Year counts
            for year, count in research_analysis.get('year_counts', {}).items():
                research_analytics.append(ResearchAnalytics(
                    metric_name='publication_year',
                    metric_value=str(year),
                    count=count
                ))
            
            # Research area counts
            for area, count in research_analysis.get('research_area_counts', {}).items():
                research_analytics.append(ResearchAnalytics(
                    metric_name='research_area',
                    metric_value=area,
                    count=count
                ))
            
            db.add_all(research_analytics)
            db.commit()
            print("Analytics data loaded successfully")
    
    def test_connection(self) -> bool:
        """Test PostgreSQL connection"""
        try:
            with get_postgres_db() as db:
                result = db.execute(text("SELECT 1"))
                result.fetchone()
            return True
        except Exception as e:
            print(f"PostgreSQL connection failed: {e}")
            return False
