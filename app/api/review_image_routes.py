from flask import Blueprint

review_image_routes = Blueprint('reviewImages', __name__)

@review_image_routes.get('/test')
def test_route():
    return 'review images'
