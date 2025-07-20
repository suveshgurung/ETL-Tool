from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models import User, Workspace
from app.core.database import create_tables
from app.api import auth


## This function is in database to create tables
create_tables()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# app.include_router(authencation.router, prefix="/api/auth")

app.include_router(auth.router, prefix="/api")


##@app.get("/test")
##async def root():
##    return {"message" : "test"}


@app.get("/api/test-db")
async def test_database(db: Session = Depends(get_db)):
    """Simple database test endpoint"""
    try:
        user_count = db.query(User).count()
        workspace_count = db.query(Workspace).count()
        return {
            "status": "connected",
            "users": user_count,
            "workspaces": workspace_count,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
