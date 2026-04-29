# services/product_service.py

from database.connection import get_db_connection
from models.product_model import Product


def get_all_products() -> list[Product]:
    """Return all products."""
    conn = get_db_connection()
    try:
        rows = conn.execute("SELECT * FROM products").fetchall()
    finally:
        conn.close()
    return [Product(row["id"], row["name"], row["price"]) for row in rows]


def get_product_by_id(product_id: int) -> Product | None:
    """Return a single product by ID."""
    conn = get_db_connection()
    try:
        row = conn.execute(
            "SELECT * FROM products WHERE id = ?", (product_id,)
        ).fetchone()
    finally:
        conn.close()
    if row:
        return Product(row["id"], row["name"], row["price"])
    return None


def add_product(name: str, price: float) -> Product:
    """Insert a new product and return it."""
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO products (name, price) VALUES (?, ?)", (name, price)
        )
        conn.commit()
        return Product(cursor.lastrowid, name, price)
    finally:
        conn.close()


def update_product(
    product_id: int, name: str | None, price: float | None
) -> Product | None:
    """Update a product's name and/or price. Returns updated Product or None if not found."""
    conn = get_db_connection()
    try:
        row = conn.execute(
            "SELECT * FROM products WHERE id = ?", (product_id,)
        ).fetchone()

        if not row:
            return None

        new_name = name if name else row["name"]
        new_price = price if price is not None else row["price"]

        conn.execute(
            "UPDATE products SET name = ?, price = ? WHERE id = ?",
            (new_name, new_price, product_id),
        )
        conn.commit()
        return Product(product_id, new_name, new_price)
    finally:
        conn.close()


def delete_product(product_id: int) -> bool:
    """Delete a product by ID. Returns True if deleted, False if not found."""
    conn = get_db_connection()
    try:
        cursor = conn.execute("DELETE FROM products WHERE id = ?", (product_id,))
        conn.commit()
        return cursor.rowcount > 0
    finally:
        conn.close()
