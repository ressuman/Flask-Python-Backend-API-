# controllers/user_controller.py

from flask import jsonify, request
from services.user_service import (
    register_user,
    authenticate_user,
    get_all_users,
    get_user_by_id,
    update_user,
    delete_user,
)
from utils.auth import get_token_from_request, blacklist_token
from utils.helpers import success_response, error_response


def register():
    """POST /register — Create a new user account."""
    data = request.get_json()
    username = data.get("username", "").strip()
    password = data.get("password", "").strip()

    if not username or not password:
        return jsonify(*error_response("Both username and password are required."))

    if len(password) < 6:
        return jsonify(*error_response("Password must be at least 6 characters long."))

    user = register_user(username, password)
    if user:
        return jsonify(
            *success_response(
                f"Account created successfully. Welcome, {username}!",
                data={"user": user.to_dict()},
                status_code=201,
            )
        )
    return jsonify(
        *error_response(
            "Username already taken. Please choose a different username.", 409
        )
    )


def login():
    """POST /login — Authenticate and log in a user."""
    data = request.get_json()
    username = data.get("username", "").strip()
    password = data.get("password", "").strip()

    if not username or not password:
        return jsonify(*error_response("Both username and password are required."))

    user = authenticate_user(username, password)
    if user:
        return jsonify(
            *success_response(
                f"Login successful. Welcome back, {username}!",
                data={"user": user.to_dict()},
            )
        )
    return jsonify(
        *error_response("Invalid username or password. Please try again.", 401)
    )


def logout():
    """POST /logout — Invalidate the current Bearer token."""
    token = get_token_from_request()
    if not token:
        return jsonify(
            *error_response("No token provided. Already logged out or never logged in.")
        )

    blacklist_token(token)
    return jsonify(
        *success_response("Logged out successfully. Your token has been invalidated.")
    )


def get_users():
    """GET /users — Retrieve all users (protected)."""
    users = get_all_users()
    return jsonify(
        *success_response(
            f"{len(users)} user(s) retrieved successfully.",
            data={"users": [u.to_dict() for u in users]},
        )
    )


def get_user(user_id):
    """GET /users/<id> — Retrieve a single user by ID (protected)."""
    user = get_user_by_id(user_id)
    if user:
        return jsonify(
            *success_response(
                "User retrieved successfully.", data={"user": user.to_dict()}
            )
        )
    return jsonify(*error_response(f"No user found with ID {user_id}.", 404))


def edit_user(user_id):
    """PUT /users/<id> — Update a user's username and/or password (protected)."""
    data = request.get_json()
    username = data.get("username", "").strip() or None
    password = data.get("password", "").strip() or None

    if not username and not password:
        return jsonify(
            *error_response(
                "Provide at least one field to update: username or password."
            )
        )

    if password and len(password) < 6:
        return jsonify(*error_response("Password must be at least 6 characters long."))

    user = update_user(user_id, username, password)
    if user:
        return jsonify(
            *success_response(
                f"User ID {user_id} updated successfully.",
                data={"user": user.to_dict()},
            )
        )
    return jsonify(
        *error_response(
            f"No user found with ID {user_id} or username already taken.", 404
        )
    )


def remove_user(user_id):
    """DELETE /users/<id> — Delete a user by ID (protected)."""
    deleted = delete_user(user_id)
    if deleted:
        return jsonify(
            *success_response(f"User ID {user_id} has been deleted successfully.")
        )
    return jsonify(*error_response(f"No user found with ID {user_id}.", 404))
