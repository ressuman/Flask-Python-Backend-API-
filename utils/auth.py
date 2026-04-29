# # utils/auth.py

# from functools import wraps
# from flask import request, jsonify
# from config.settings import API_TOKEN


# def require_token(f):
#     @wraps(f)
#     def decorated_function(*args, **kwargs):
#         token = request.headers.get("Authorization")

#         if token != f"Bearer {API_TOKEN}":
#             return jsonify({"error": "Unauthorized access. Valid token required."}), 401

#         return f(*args, **kwargs)

#     return decorated_function

# utils/auth.py

from functools import wraps
from flask import request, jsonify
from config.settings import API_TOKEN

# In-memory blacklist for logged-out tokens
blacklisted_tokens: set = set()


def get_token_from_request() -> str | None:
    """Extract Bearer token from Authorization header."""
    auth_header = request.headers.get("Authorization", "")
    if auth_header.startswith("Bearer "):
        return auth_header[len("Bearer ") :]
    return None


def require_token(f):
    """Decorator: protect a route with Bearer token authentication."""

    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = get_token_from_request()

        if not token:
            return (
                jsonify(
                    {
                        "status": False,
                        "message": "Authorization token is missing. Include 'Bearer <token>' in the Authorization header.",
                    }
                ),
                401,
            )

        if token in blacklisted_tokens:
            return (
                jsonify(
                    {
                        "status": False,
                        "message": "Token has been invalidated. Please log in again.",
                    }
                ),
                401,
            )

        if token != API_TOKEN:
            return (
                jsonify(
                    {
                        "status": False,
                        "message": "Invalid token. Unauthorized access denied.",
                    }
                ),
                401,
            )

        return f(*args, **kwargs)

    return decorated_function


def blacklist_token(token: str) -> None:
    """Add a token to the blacklist (logout)."""
    blacklisted_tokens.add(token)
