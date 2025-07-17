from pymongo import MongoClient
from contextlib import contextmanager
from dotenv import load_dotenv
import os
from .config import settings

load_dotenv()

client = MongoClient(
    settings.MONGO_URL,
    serverselectiontimeoutms=3000,
    connecttimeoutms=3000
)


@contextmanager
def get_mongo_db():
    db = client[os.getenv("MONGO_DATABASE")]
    yield db
