from sqlalchemy import Boolean, Column, DateTime, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .base import Base


class Workspace(Base):
    __tablename__ = "workspaces"

    id = Column(String(36), primary_key=True, index=True)
    name = Column(String, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    # Relationship to owner
    owner = relationship("User", back_populates="workspaces")
