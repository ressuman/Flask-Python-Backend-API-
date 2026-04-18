# main.py

from api import app


def main():
    print("Starting Flask CRUD API with uv...")


if __name__ == "__main__":
    # Run the Flask app
    app.run(debug=True, host="localhost", port=5001)
