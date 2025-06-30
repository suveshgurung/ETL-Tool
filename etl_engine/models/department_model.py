from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from etl_engine.core.database import Base

class Department(Base):
    __tablename__ = "departments"

    department_name = Column(String(100), primary_key=True, index=True)
    school_name = Column("school", String(100), ForeignKey("schools.school_name"), nullable=False)
    number_of_faculty = Column(Integer, nullable=False)

    # Relationship between the faculty and school.
    school = relationship("School", back_populates="department")
    faculties = relationship("Faculty", back_populates="department")

    def __repr__(self):
        return f"<Department(department_name='{self.department_name}', school='{self.school_name}', number_of_faculty='{self.number_of_faculty}')>"
