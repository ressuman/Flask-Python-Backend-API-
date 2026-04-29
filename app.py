# app.py

from flask import Flask
from flask_cors import CORS
from routes.product_routes import product_bp
from routes.user_routes import user_bp
from create_db import init_db
from config.settings import DEBUG, HOST, PORT

app = Flask(__name__)
CORS(app)

# Initialize DB tables
with app.app_context():
    init_db()

# Register blueprints
app.register_blueprint(product_bp)
app.register_blueprint(user_bp)


@app.route("/")
def home():
    return {"message": "Hello from our Authenticated User And Product Flask Server!"}


if __name__ == "__main__":
    app.run(debug=DEBUG, host=HOST, port=PORT)
