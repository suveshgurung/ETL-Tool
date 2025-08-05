from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from etl_engine.core.sql_database import Base


class Faculty(Base):
    __tablename__ = "faculties"

    faculty_id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(50), nullable=False)
    middle_name = Column(String(50), nullable=True)
    last_name = Column(String(50), nullable=False)
    department_name = Column("department", String(100), ForeignKey("departments.department_name"), nullable=True)
    school_name = Column("school", String(100), ForeignKey("schools.school_name"), nullable=False)
    position = Column(String(50), nullable=False)

    # Relationship between the faculty and department.
    department = relationship("Department", back_populates="faculties")
    # Relationship between the faculty and school.
    school = relationship("School", back_populates="faculties")

    def __repr__(self):
        return f"<Faculty(first_name='{self.first_name}', middle_name='{self.middle_name}', last_name='{self.last_name}', position='{self.position}', department='{self.department}')>"

    def as_dict(self):
        return {
            "faculty_id": self.faculty_id,
            "first_name": self.first_name,
            "middle_name": self.middle_name,
            "last_name": self.last_name,
            "department_name": self.department_name,
            "school_name": self.school_name,
            "position": self.position
        }
