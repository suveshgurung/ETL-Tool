## Will create functions here that will be used for the authencation process
from pydantic import BaseModel


class UserCreate(BaseModel):
    username: str
    email: str
    password: str
