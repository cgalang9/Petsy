from flask import Blueprint

review_routes = Blueprint('reviews', __name__)

@review_routes.get('/test')
def test_route():
    return 'reviews'
