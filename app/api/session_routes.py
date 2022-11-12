from flask import Blueprint

session_routes = Blueprint('session', __name__)

@session_routes.get('/test')
def test_route():
    return 'session'
