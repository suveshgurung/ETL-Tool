from datetime import datetime
from enum import Enum
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class EducationLevel(str, Enum):
    BACHELOR = "bachelor"
    MASTER = "master"
    PHD = "phd"
    DIPLOMA = "diploma"


class IndustryType(str, Enum):
    TECHNOLOGY = "technology"
    FINANCE = "finance"
    HEALTHCARE = "healthcare"
    EDUCATION = "education"
    CONSULTING = "consulting"
    MANUFACTURING = "manufacturing"
    GOVERNMENT = "government"
    NONPROFIT = "nonprofit"
    ENTREPRENEUR = "entrepreneur"
    OTHER = "other"


class Alumni(BaseModel):
    alumni_id: str = Field(..., description="Unique identifier for alumni")
    first_name: str
    last_name: str
    email: str
    graduation_year: int
    department: str
    degree_level: EducationLevel
    gpa: Optional[float] = None
    created_at: datetime = Field(default_factory=datetime.now)


class CareerPosition(BaseModel):
    position_id: str = Field(..., description="Unique identifier for position")
    alumni_id: str
    company_name: str
    job_title: str
    industry: IndustryType
    start_date: datetime
    end_date: Optional[datetime] = None
    is_current: bool = False
    salary_range: Optional[str] = None
    location: Optional[str] = None
    skills_used: List[str] = []


class Survey(BaseModel):
    survey_id: str
    alumni_id: str
    survey_date: datetime
    current_salary: Optional[float] = None
    job_satisfaction: Optional[int] = Field(None, ge=1, le=10)
    career_progression: Optional[str] = None
    skills_gained: List[str] = []
    additional_education: List[str] = []
    mentoring_participation: bool = False
    entrepreneurship_status: Optional[str] = None


class ProcessedAlumniData(BaseModel):
    alumni_id: str
    personal_info: Alumni
    career_history: List[CareerPosition]
    survey_responses: List[Survey]
    career_metrics: Dict[str, Any]
    success_indicators: Dict[str, Any]
