# controllers/product_controller.py

from flask import jsonify, request
from services.product_service import (
    get_all_products,
    get_product_by_id,
    add_product,
    update_product,
    delete_product,
)
from utils.helpers import success_response, error_response


def get_products():
    """GET /products — Retrieve all products."""
    products = get_all_products()
    return jsonify(
        *success_response(
            f"{len(products)} product(s) retrieved successfully.",
            data={"products": [p.to_dict() for p in products]},
        )
    )


def get_product(product_id):
    """GET /products/<id> — Retrieve a single product by ID."""
    product = get_product_by_id(product_id)
    if product:
        return jsonify(
            *success_response(
                "Product retrieved successfully.", data={"product": product.to_dict()}
            )
        )
    return jsonify(*error_response(f"No product found with ID {product_id}.", 404))


def create_product():
    """POST /products — Add a new product (protected)."""
    data = request.get_json()
    name = data.get("name", "").strip()
    price = data.get("price")

    if not name:
        return jsonify(*error_response("Product name is required."))

    if price is None:
        return jsonify(*error_response("Product price is required."))

    if not isinstance(price, (int, float)) or price < 0:
        return jsonify(*error_response("Price must be a valid non-negative number."))

    product = add_product(name, price)
    return jsonify(
        *success_response(
            f"Product '{name}' added successfully.",
            data={"product": product.to_dict()},
            status_code=201,
        )
    )


def edit_product(product_id):
    """PUT /products/<id> — Update a product's name and/or price (protected)."""
    data = request.get_json()
    name = data.get("name", "").strip() or None
    price = data.get("price")

    if not name and price is None:
        return jsonify(
            *error_response("Provide at least one field to update: name or price.")
        )

    if price is not None and (not isinstance(price, (int, float)) or price < 0):
        return jsonify(*error_response("Price must be a valid non-negative number."))

    product = update_product(product_id, name, price)
    if product:
        return jsonify(
            *success_response(
                f"Product ID {product_id} updated successfully.",
                data={"product": product.to_dict()},
            )
        )
    return jsonify(*error_response(f"No product found with ID {product_id}.", 404))


def remove_product(product_id):
    """DELETE /products/<id> — Delete a product by ID (protected)."""
    deleted = delete_product(product_id)
    if deleted:
        return jsonify(
            *success_response(f"Product ID {product_id} has been deleted successfully.")
        )
    return jsonify(*error_response(f"No product found with ID {product_id}.", 404))
