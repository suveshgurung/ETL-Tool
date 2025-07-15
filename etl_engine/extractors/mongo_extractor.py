from typing import Dict, Any, Iterator
from fastapi import FastAPI, Depends, HTTPException
from pymongo.collection import Collection
from bson import ObjectId
from etl_engine.core.mongo_database import get_collection
from .base_extractor import BaseExtractor


class MongoDbExtractor(BaseExtractor):

    print("MongoDbExtractor Test")
    """ Functions needed for the class"""

    """ This needs to take connection parameters too"""

    def connect(self, connection_params: Dict[str, Any]) -> bool:
        print("connecting to database")
        return True

    def extract(self):
        print("extract the data from mongo_database")
