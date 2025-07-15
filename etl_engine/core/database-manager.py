from pydantic import BaseModel
from enum import Enum

from sqlalchemy import create_engine


class ConnectionStatus(Enum):
    HEALTHY = "healthy"
    UNHEALTHEY = "unhealthy"
    UNKNOW = "unknown"


class DatabaseConnection(BaseModel):



def reqister_mongodb_connection(self, 
                                connection_id: str, 
                                conectiion_url: str,
                                ):
    try:
        engine = create_engine(


    )


