# app/models/__init__.py
from .base import Base
from .user import User
from .workspace import Workspace

# This ensures all models are imported when the models package is imported
__all__ = ["Base", "User", "Workspace"]
