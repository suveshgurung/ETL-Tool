from pydantic import BaseModel
from typing import Dict, List

class FacultyAnalysis(BaseModel):
    total_faculty: int
    positions_counts: Dict[str, int]
    department_counts: Dict[str, int]
    school_counts: Dict[str, int]

class ResearchAnalysis(BaseModel):
    total_publications: int
    year_counts: Dict[int, int]
    research_area_counts: Dict[str, int]
    department_counts: Dict[str, int]
    school_counts: Dict[str, int]

class FacultyResearchMapping(BaseModel):
    faculty_name: str
    research_areas: List[str]
    department: str
    school: str
    position: str
