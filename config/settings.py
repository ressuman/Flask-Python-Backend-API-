# config/settings.py

import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# ── Base Paths ────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATABASE_PATH = os.path.join(BASE_DIR, "products.db")

# ── Environment ───────────────────────────────────────────────
DEBUG = os.getenv("DEBUG", "false").lower() == "true"

# ── Server ────────────────────────────────────────────────────
HOST = os.getenv("HOST", "127.0.0.1")
PORT = int(os.getenv("PORT", 5001))  # cast to int — Flask requires it

# ── Security ──────────────────────────────────────────────────
API_TOKEN = os.getenv("API_TOKEN")

if not DEBUG and not API_TOKEN:
    raise ValueError(
        "API_TOKEN environment variable is not set. "
        "Add it to your .env file or environment before running in production."
    )

if DEBUG and not API_TOKEN:
    API_TOKEN = "dev-token-not-for-prod"  # safe placeholder, only in DEBUG mode
