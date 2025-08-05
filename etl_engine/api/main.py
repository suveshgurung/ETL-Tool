from fastapi import FastAPI, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
import pandas as pd
from pydantic import BaseModel

from etl_engine.loaders.postgres_loader import (
    get_postgres_db, AnalyticsFaculty, ResearchArea, Publication, FacultyAnalytics, ResearchAnalytics
)

app = FastAPI(
    title="KU ETL API",
    description="API for faculty and research data analytics",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FacultyResponse(BaseModel):
    faculty_id: int
    first_name: str
    middle_name: Optional[str]
    last_name: str
    normalized_name: str
    department_name: Optional[str]
    school_name: str
    position: str
    research_areas: List[str]
    publication_count: int

class PublicationResponse(BaseModel):
    id: int
    faculty_id: int
    paper_title: str
    published_year: int
    journal: Optional[str]
    coauthors: Optional[str]

class AnalyticsResponse(BaseModel):
    metric_name: str
    data: Dict[str, int]

class FacultySupervisorResponse(BaseModel):
    faculty_id: int
    name: str
    department: Optional[str]
    school: str
    position: str
    research_areas: List[str]
    recent_publications: int


def get_db():
    with get_postgres_db() as db:
        yield db


# API's
@app.get("/")
async def root():
    return {"message": "University Faculty Research API"}

@app.get("/faculty", response_model=List[FacultyResponse])
async def get_all_faculty(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    position: Optional[str] = None,
    department: Optional[str] = None,
    school: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all faculty with optional filters"""
    query = db.query(AnalyticsFaculty)
    
    if position:
        query = query.filter(AnalyticsFaculty.position.ilike(f"%{position}%"))
    if department:
        query = query.filter(AnalyticsFaculty.department_name.ilike(f"%{department}%"))
    if school:
        query = query.filter(AnalyticsFaculty.school_name.ilike(f"%{school}%"))
    
    faculties = query.offset(skip).limit(limit).all()
    
    result = []
    for faculty in faculties:
        publication_count = db.query(Publication).filter(Publication.faculty_id == faculty.faculty_id).count()
        result.append(FacultyResponse(
            faculty_id=faculty.faculty_id,
            first_name=faculty.first_name,
            middle_name=faculty.middle_name,
            last_name=faculty.last_name,
            normalized_name=faculty.normalized_name,
            department_name=faculty.department_name,
            school_name=faculty.school_name,
            position=faculty.position,
            research_areas=[area.area_name for area in faculty.research_areas],
            publication_count=publication_count
        ))
    
    return result

@app.get("/faculty/{faculty_id}", response_model=FacultyResponse)
async def get_faculty_by_id(faculty_id: int, db: Session = Depends(get_db)):
    """Get specific faculty by ID"""
    faculty = db.query(AnalyticsFaculty).filter(AnalyticsFaculty.faculty_id == faculty_id).first()
    
    if not faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")
    
    publication_count = db.query(Publication).filter(Publication.faculty_id == faculty_id).count()
    
    return FacultyResponse(
        faculty_id=faculty.faculty_id,
        first_name=faculty.first_name,
        middle_name=faculty.middle_name,
        last_name=faculty.last_name,
        normalized_name=faculty.normalized_name,
        department_name=faculty.department_name,
        school_name=faculty.school_name,
        position=faculty.position,
        research_areas=[area.area_name for area in faculty.research_areas],
        publication_count=publication_count
    )

@app.get("/faculty/search/supervisor", response_model=List[FacultySupervisorResponse])
async def find_supervisors(
    research_area: str = Query(..., description="Research area to search for"),
    position_filter: Optional[str] = Query(None, description="Filter by position (professor, associate professor, etc.)"),
    min_publications: int = Query(0, description="Minimum number of publications"),
    db: Session = Depends(get_db)
):
    """Find potential supervisors by research area"""
    # Find research area
    area = db.query(ResearchArea).filter(ResearchArea.area_name.ilike(f"%{research_area}%")).first()
    
    if not area:
        raise HTTPException(status_code=404, detail="Research area not found")
    
    # Get faculties in this research area
    query = db.query(AnalyticsFaculty).filter(AnalyticsFaculty.research_areas.contains(area))
    
    if position_filter:
        query = query.filter(AnalyticsFaculty.position.ilike(f"%{position_filter}%"))
    
    faculties = query.all()
    
    result = []
    for faculty in faculties:
        # Count recent publications (last 5 years)
        recent_pub_count = db.query(Publication).filter(
            Publication.faculty_id == faculty.faculty_id,
            Publication.published_year >= 2019
        ).count()
        
        total_pub_count = db.query(Publication).filter(Publication.faculty_id == faculty.faculty_id).count()
        
        if total_pub_count >= min_publications:
            result.append(FacultySupervisorResponse(
                faculty_id=faculty.faculty_id,
                name=f"{faculty.first_name} {faculty.middle_name or ''} {faculty.last_name}".strip(),
                department=faculty.department_name,
                school=faculty.school_name,
                position=faculty.position,
                research_areas=[area.area_name for area in faculty.research_areas],
                recent_publications=recent_pub_count
            ))
    
    # Sort by recent publications count
    result.sort(key=lambda x: x.recent_publications, reverse=True)
    
    return result

@app.get("/publications", response_model=List[PublicationResponse])
async def get_publications(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    faculty_id: Optional[int] = None,
    year_from: Optional[int] = None,
    year_to: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """Get publications with optional filters"""
    query = db.query(Publication)
    
    if faculty_id:
        query = query.filter(Publication.faculty_id == faculty_id)
    if year_from:
        query = query.filter(Publication.published_year >= year_from)
    if year_to:
        query = query.filter(Publication.published_year <= year_to)
    
    publications = query.offset(skip).limit(limit).all()
    
    return [
        PublicationResponse(
            id=pub.id,
            faculty_id=pub.faculty_id,
            paper_title=pub.paper_title,
            published_year=pub.published_year,
            journal=pub.journal,
            coauthors=pub.coauthors
        )
        for pub in publications
    ]

@app.get("/analytics/faculty", response_model=List[AnalyticsResponse])
async def get_faculty_analytics(db: Session = Depends(get_db)):
    """Get faculty analytics (positions, departments, schools)"""
    analytics = db.query(FacultyAnalytics).all()
    
    # Group by metric_name
    grouped = {}
    for record in analytics:
        if record.metric_name not in grouped:
            grouped[record.metric_name] = {}
        grouped[record.metric_name][record.metric_value] = record.count
    
    return [
        AnalyticsResponse(metric_name=name, data=data)
        for name, data in grouped.items()
    ]

@app.get("/analytics/research", response_model=List[AnalyticsResponse])
async def get_research_analytics(db: Session = Depends(get_db)):
    """Get research analytics (years, areas)"""
    analytics = db.query(ResearchAnalytics).all()
    
    # Group by metric_name
    grouped = {}
    for record in analytics:
        if record.metric_name not in grouped:
            grouped[record.metric_name] = {}
        grouped[record.metric_name][record.metric_value] = record.count
    
    return [
        AnalyticsResponse(metric_name=name, data=data)
        for name, data in grouped.items()
    ]

@app.get("/research-areas", response_model=List[str])
async def get_research_areas(db: Session = Depends(get_db)):
    """Get all available research areas"""
    areas = db.query(ResearchArea).all()
    return [area.area_name for area in areas]

@app.get("/statistics/summary")
async def get_summary_statistics(db: Session = Depends(get_db)):
    """Get overall summary statistics"""
    total_faculty = db.query(AnalyticsFaculty).count()
    total_publications = db.query(Publication).count()
    total_research_areas = db.query(ResearchArea).count()
    
    # Get position breakdown
    position_stats = {}
    positions = db.query(FacultyAnalytics).filter(FacultyAnalytics.metric_name == 'position').all()
    for pos in positions:
        position_stats[pos.metric_value] = pos.count
    
    return {
        "total_faculty": total_faculty,
        "total_publications": total_publications,
        "total_research_areas": total_research_areas,
        "position_breakdown": position_stats
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
