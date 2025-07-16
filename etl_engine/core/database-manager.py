from typing import Tuple
from pymongo import MongoClient
import pymysql
from models.connection_model import DBType, DbCOnnectionParameters, ConnectionStatus

 
## Data needs to be passed user, password, port , host
## will be used for all, postgresql, sql, Mongodb
def database_manager(params : DbCOnnectionParameters) -> Tuple[bool, ConnectionStatus]:
    try:
        if params.db_type == DBType.MONGODB:
            url = f"mongodb://{params.user}:{params.password}&{params.host}:{params.port}/"
            client = MongoClient(url, ServerSelectionTimeoutError = 3000)
            client.server_info()


        elif params.db_type == DBType.MYSQL:
            conn = pymysql.connect(
            host = params.host,
            user = params.user,
            password= params.password,
            port = int(params.port),
        )
            conn.close()

        ## Need to do for postgresql, psycopg2 didn't work so i didn't bother
        else:
            return False, ConnectionStatus.UNKNOWN

        return True, ConnectionStatus.HEALTHY


    except Exception as e:
        print(f"Error {e}")

        return False, ConnectionStatus.UNHEALTHY


            

        
            

    








    

    ## For not getting error right now




