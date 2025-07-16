from typing import Tuple
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError, ConnectionFailure
import pymysql
import psycopg2
from etl_engine.models.connection_model import DBConnectionParams, ConnectionStatus, DBType



def database_manager(params: DBConnectionParams) -> Tuple[bool, ConnectionStatus]:
    
    try:
        if params.db_type == DBType.MONGODB:
            # Use mongo_url if provided, otherwise construct from individual params
            if params.mongo_url:
                url = params.mongo_url
            else:
                port = params.port or 27017  # Default MongoDB port
                if params.user and params.password:
                    url = f"mongodb://{params.user}:{params.password}@{params.host}:{port}/"
                else:
                    url = f"mongodb://{params.host}:{port}/"
            
            client = MongoClient(url, serverSelectionTimeoutMS=3000)
            # Test the connection
            client.admin.command('ping')
            client.close()
            
        elif params.db_type == DBType.MYSQL:
            connection_params = {
                'host': params.host or 'localhost',
                'user': params.user or 'root',
                'password': params.password or '',
                'port': int(params.port) if params.port else 3306,
                'connect_timeout': 3
            }
            
            # Add database if provided
            if params.database:
                connection_params['database'] = params.database
                
            conn = pymysql.connect(**connection_params)
            conn.ping(reconnect=False)  # Test connection
            conn.close()
            
        elif params.db_type == DBType.POSTGRESQL:
            connection_params = {
                'host': params.host or 'localhost',
                'user': params.user or 'postgres',
                'password': params.password or '',
                'port': int(params.port) if params.port else 5432,
                'database': params.database or 'postgres',
                'connect_timeout': 3
            }
            
            conn = psycopg2.connect(**connection_params)
            # Test connection
            cur = conn.cursor()
            cur.execute('SELECT 1')
            cur.close()
            conn.close()
            
        else:
            return False, ConnectionStatus.UNKNOWN
            
        return True, ConnectionStatus.HEALTHY
        
    except (ServerSelectionTimeoutError, ConnectionFailure) as e:
        print(f"MongoDB connection error: {e}")
        return False, ConnectionStatus.UNHEALTHY
    except pymysql.Error as e:
        print(f"MySQL connection error: {e}")
        return False, ConnectionStatus.UNHEALTHY
    except psycopg2.Error as e:
        print(f"PostgreSQL connection error: {e}")
        return False, ConnectionStatus.UNHEALTHY
    except Exception as e:
        print(f"Database connection error: {e}")
        return False, ConnectionStatus.UNHEALTHY
