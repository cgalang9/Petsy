from flask import Blueprint

item_routes = Blueprint('items', __name__)

@item_routes.route('/test')
def test_route():
    return 'items'
