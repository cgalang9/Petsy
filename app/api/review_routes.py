from flask import Blueprint, request
from flask_login import current_user
from app.models import Review, db

review_routes = Blueprint('reviews', __name__)


@review_routes.get('/test')
def test_route():
    return 'reviews'


@review_routes.delete('/<int:id>')
def delete_review(id):
    delete_review = Review.query.get(id)
    if not delete_review:
        return {"message": "Review not found"}, 404
    elif current_user.is_authenticated and delete_review.user_id == current_user.id:
        db.session.delete(delete_review)
        db.session.commit()
        return {"message": "Successfully deleted"}
    else:
        return {"message": "Forbidden"}, 403
