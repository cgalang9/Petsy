from flask import Blueprint, request
from flask_login import current_user
from app.models import Review, ReviewImage, db

review_routes = Blueprint('reviews', __name__)


@review_routes.get('/test')
def test_route():
    return 'reviews'


@review_routes.delete('/<int:id>')
def delete_review(id):
    """
    deletes review by review id
    """
    deleted_review = Review.query.get(id)
    if not deleted_review:
        return {"message": "Review not found"}, 404
    elif current_user.is_authenticated and deleted_review.user_id == current_user.id:
        db.session.delete(deleted_review)
        db.session.commit()
        return {"message": "Review Successfully deleted"}
    else:
        return {"message": "Forbidden"}, 403


@review_routes.post('/<int:id>/images')
def add_review_image(id):
    """
    posts a review image by review id
    """
    review = Review.query.get(id)
    url = request.json.get('url')
    if not review:
        return {"message": "Review not found"}, 404
    elif not (current_user.is_authenticated and review.user_id == current_user.id):
        return {"message": "Forbidden"}, 403
    elif not url or '.' not in url:
        return ({"message": "validation error",
        "errors": {
            "url": "url must be valid"
        }}, 400)
    else:
        new_review_image = ReviewImage(
            url=url,
            review_id=review.id
            )
        db.session.add(new_review_image)
        db.session.commit()
        return {"message": "image successfully created"}
