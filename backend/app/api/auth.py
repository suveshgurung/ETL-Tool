from datetime import datetime, timedelta
from typing import Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from pydantic import BaseModel, EmailStr

from app.core.database import get_db
from app.core.config import settings
from app.models.user import User


# App router
router = APIRouter()
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


def verify_password(plain_password, hashed_password) -> bool:
    return password_context.verify(plain_password, hashed_password)


def get_hashed_password(plain_password) -> str:
    return password_context.hash(plain_password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    data_to_encode = data.copy()
    if expires_delta:
        # add the expiry time specified into the token
        expire_time = datetime.utcnow() + expires_delta
    else:
        # default expiry time is 15 minutes
        expire_time = datetime.utcnow() + timedelta(minutes=15)
    data_to_encode.update({"expiry": str(expire_time)})
    encoded_jwt = jwt.encode(data_to_encode, settings.JWT_SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


@router.post("/signup")
async def signup(user: UserCreate, db: Session = Depends(get_db)):
    try:
        user = db.query(User).filter(User.email == user.email).first()
        print(user)
    except Exception as e:
        print(e)


@router.get("/test")
def test():
    test_dict = {
        "user_id": 1,
        "name": "Subbu bhai re baby"
    }
    return {
        "jwt": create_access_token(test_dict, timedelta(minutes=50))
    }
