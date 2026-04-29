# database/connection.py

# import os
# import sqlite3


# def get_db_connection():
#     BASE_DIR = os.path.dirname(os.path.abspath(__file__))
#     db_path = os.path.join(BASE_DIR, "..", "products.db")
#     conn = sqlite3.connect(db_path)
#     conn.row_factory = sqlite3.Row
#     return conn


import sqlite3
from config.settings import DATABASE_PATH


def get_db_connection():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn
