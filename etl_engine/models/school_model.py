from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship


class School():
    __tablename__ = "schools"

    school_name = Column(String(100), primary_key=True, index=True)

    # Relationship between school and department
    department = relationship("Department", back_populates="school")
    # Relationship between school and faculties
    faculties = relationship("Faculty", back_populates="school")

    def __repr__(self):
        return f"<School(school_name='{self.school_name}')>"

    def as_dict(self):
        return {"school_name": self.school_name}
