from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from etl_engine.core.database import Base

class School(Base):
    __tablename__ = "schools"

    school_name = Column(String(100), primary_key=True, index=True)

    # Relationship between school and department
    department = relationship("Department", back_populates="school")
    # Relationship between school and faculties
    faculties = relationship("Faculty", back_populates="school")

    def __repr__(self):
        return f"<School(school_name='{self.school_name}')>"
