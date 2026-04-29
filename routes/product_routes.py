# routes/product_routes.py

from flask import Blueprint
from controllers.product_controller import (
    get_products,
    get_product,
    create_product,
    edit_product,
    remove_product,
)
from utils.auth import require_token

product_bp = Blueprint("products", __name__)

# Public routes
product_bp.route("/products", methods=["GET"])(get_products)
product_bp.route("/products/<int:product_id>", methods=["GET"])(get_product)

# Protected routes
product_bp.route("/products", methods=["POST"])(require_token(create_product))
product_bp.route("/products/<int:product_id>", methods=["PUT"])(
    require_token(edit_product)
)
product_bp.route("/products/<int:product_id>", methods=["DELETE"])(
    require_token(remove_product)
)
