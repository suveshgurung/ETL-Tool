import logging
import time
import mysql.connector as mysql
from mysql.connector import errorcode

# Logger setup
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
formatter = logging.Formatter(
    "%(asctime)s - %(name)s %(message)s")

# Log to console
handler = logging.StreamHandler()
handler.setFormatter(formatter)
logger.addHandler(handler)

# Log to file as well
file_handler = logging.FileHandler("sql-connector-errors.log")
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)


def connect_to_mysql(config, max_attempts=3, delay=2):
    attempts = 1

    while attempts < max_attempts + 1:
        try:
            return mysql.connect(**config)
        except (mysql.Error, IOError) as err:
            if (attempts == max_attempts):
                # All attempts to reconnect failed; return None
                logger.info("Failed to connect to SQL database, exiting without a connection: %s", err)
                return None

            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                error_message = "Invalid credentials provided!"
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                error_message = "Provided database does not exist!"

            logger.info(
                "Connection failed: %s. Retrying (%d/%d)...",
                error_message,
                attempts,
                max_attempts - 1,
            )
            # Reconnect delay
            time.sleep(delay ** attempts)
            attempts += 1

    return None
