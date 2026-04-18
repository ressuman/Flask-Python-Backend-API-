# api/routes.py

from . import api
from .resources import Users, User

api.add_resource(Users, "/api/users/")
api.add_resource(User, "/api/users/<int:id>")
