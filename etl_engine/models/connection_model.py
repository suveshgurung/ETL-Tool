from typing import Optional, Union
from pydantic import BaseModel
from enum import Enum

from etl_engine.core.sql_database import Base


class DBType(str, Enum):
    POSTGRESQL = "postgresql"
    MYSQL = "mysql"
    MONGODB = "mongodb"

class ConnectionStatus(str, Enum):
    UNHEALTHY = "unhealthy"
    HEALTHY = "healthy"
    UNKNOWN = "unknown"

class DBConnectionParams(BaseModel):
    db_type: DBType
    user: Optional[str] = None
    password: Optional[str] = None
    port: Optional[Union[int, str]] = None  # Accept both int and str
    host: Optional[str] = None
    database: Optional[str] = None
    mongo_url: Optional[str] = None
    
