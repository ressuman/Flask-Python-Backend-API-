# utils/hashing.py

import bcrypt


def hash_password(password: str) -> str:
    """Hash a password using bcrypt (salted + slow by design)."""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode(), salt).decode()


def verify_password(password: str, hashed_password: str) -> bool:
    """Verify a plaintext password against a bcrypt hash."""
    return bcrypt.checkpw(password.encode(), hashed_password.encode())
