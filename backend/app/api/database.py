from fastapi import APIRouter, FastAPI, HTTPException
from pydantic import BaseModel

## Core config of database
from etl_engine.models.connection_model import DBConnectionParams, DBType, ConnectionStatus
from etl_engine.core.database_manager import database_manager


router = APIRouter()


class DatabaseConnectionResponse(BaseModel):
    success : bool
    status: ConnectionStatus
    message : str
    db_type : str



@router.post("/test-connection", response_model=DatabaseConnectionResponse)

async def test_database_connection(request: DBConnectionParams):
    try:
        success, status = database_manager(request)


        return DatabaseConnectionResponse(
            success=success,
            status=status,
            message="connection successful " if success else "connection failed",
            db_type=request.db_type.value,
        )

    except Exception as e:
        return HTTPException(
            status_code=500,
            detail=f"Error testing connection : {str(e)}"


        )

