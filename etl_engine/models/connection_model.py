from pydantic import BaseModel
from enum import Enum

from etl_engine.core.sql_database import Base


class  DBType(str, Enum):
    POSTGRESQL = "postgresql"
    MYSQL = "mysql"
    MONGODB = "mongodb"

class ConnectionStatus(str, Enum):
    UNHEALTHY = "unhealthy"
    HEALTHY = "healthy"
    UNKNOWN = "unknown"



class DbCOnnectionParameters(BaseModel):
    db_type : DBType
    user : str
    password : str
    port: str
    host: str

