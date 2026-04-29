# services/user_service.py

import sqlite3
from database.connection import get_db_connection
from models.user_model import User
from utils.hashing import hash_password, verify_password


def register_user(username: str, password: str) -> User | None:
    """Register a new user. Returns User on success, None if username taken."""
    hashed_password = hash_password(password)
    conn = get_db_connection()
    try:
        conn.execute(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            (username, hashed_password),
        )
        conn.commit()
        new_id = conn.execute("SELECT last_insert_rowid()").fetchone()[0]
        return User(new_id, username, hashed_password)
    except sqlite3.IntegrityError:
        return None
    finally:
        conn.close()


def authenticate_user(username: str, password: str) -> User | None:
    """Fetch user by username and verify password with bcrypt."""
    conn = get_db_connection()
    try:
        row = conn.execute(
            "SELECT * FROM users WHERE username = ?", (username,)
        ).fetchone()
    finally:
        conn.close()

    if row and verify_password(password, row["password"]):
        return User(row["id"], row["username"], row["password"])
    return None


def get_all_users() -> list[User]:
    """Return all users."""
    conn = get_db_connection()
    try:
        rows = conn.execute("SELECT * FROM users").fetchall()
    finally:
        conn.close()
    return [User(row["id"], row["username"], row["password"]) for row in rows]


def get_user_by_id(user_id: int) -> User | None:
    """Return a single user by ID."""
    conn = get_db_connection()
    try:
        row = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    finally:
        conn.close()
    if row:
        return User(row["id"], row["username"], row["password"])
    return None


def update_user(
    user_id: int, username: str | None, password: str | None
) -> User | None:
    """Update username and/or password. Returns updated User or None if not found."""
    conn = get_db_connection()
    try:
        row = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()

        if not row:
            return None

        new_username = username if username else row["username"]
        new_password = hash_password(password) if password else row["password"]

        conn.execute(
            "UPDATE users SET username = ?, password = ? WHERE id = ?",
            (new_username, new_password, user_id),
        )
        conn.commit()
        return User(user_id, new_username, new_password)
    except sqlite3.IntegrityError:
        return None
    finally:
        conn.close()


def delete_user(user_id: int) -> bool:
    """Delete a user by ID. Returns True if deleted, False if not found."""
    conn = get_db_connection()
    try:
        cursor = conn.execute("DELETE FROM users WHERE id = ?", (user_id,))
        conn.commit()
        return cursor.rowcount > 0
    finally:
        conn.close()
