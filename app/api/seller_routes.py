from flask import Blueprint

seller_routes = Blueprint('sellers', __name__)

@seller_routes.get('/test')
def test_route():
    return 'seller'
