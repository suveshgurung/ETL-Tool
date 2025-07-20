import os
from passlib.context import CryptContext
from fastapi import HTTPException
from app.models import User
from pydantic import BaseModel
from app.core.database import get_db
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException


password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


router = APIRouter()


class UserCreate(BaseModel):
    username: str
    email: str
    hashed_password: str
    first_name: str  # optional
    last_name: str  # optional


def get_hashed_password(password: str) -> str:
    return password_context.hash(password)


@router.post("/register")
def register_user(user: UserCreate, session: Session = Depends(get_db)):
    existing_user = session.query(User).filter_by(email=user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    encrypted_password = get_hashed_password(user.hashed_password)

    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=encrypted_password,
        first_name=user.first_name,  # include first_name
        last_name=user.last_name,  # include last_name
        is_active=True,
    )

    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    return {"message": "user created successfully"}
