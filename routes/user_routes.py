# routes/user_routes.py

from flask import Blueprint
from controllers.user_controller import (
    register,
    login,
    logout,
    get_users,
    get_user,
    edit_user,
    remove_user,
)
from utils.auth import require_token

user_bp = Blueprint("users", __name__)

# Public routes
user_bp.route("/register", methods=["POST"])(register)
user_bp.route("/login", methods=["POST"])(login)
user_bp.route("/logout", methods=["POST"])(require_token(logout))

# Protected routes
user_bp.route("/users", methods=["GET"])(require_token(get_users))
user_bp.route("/users/<int:user_id>", methods=["GET"])(require_token(get_user))
user_bp.route("/users/<int:user_id>", methods=["PUT"])(require_token(edit_user))
user_bp.route("/users/<int:user_id>", methods=["DELETE"])(require_token(remove_user))
