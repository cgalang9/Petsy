from flask import Blueprint

order_routes = Blueprint('orders', __name__)

@order_routes.get('/test')
def test_route():
    return 'orders'
