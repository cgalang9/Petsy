from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Review, ReviewImage, db
from ..forms.review_form import CreateEditReviewForm
from .auth_routes import validation_errors_to_error_messages


review_routes = Blueprint('reviews', __name__)


@review_routes.get('/test')
def test_route():
    return 'reviews'


@review_routes.delete('/<int:id>')
@login_required
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
@login_required
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


@review_routes.put("/<int:review_id>")
@login_required
def edit_review(review_id):
    """
    Edit a review of item by review id
    """
    # check if review exists
    review_check = Review.query.get(review_id)


    # if it doesn't exist in database, return error
    if not review_check:
        return {"message": "review not found"}, 404


    # assign shorter form name and check for csrf_token
    form = CreateEditReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # using wtforms validation to check validity of review data for database
    # returns errors if they exist
    if form.validate_on_submit():

        # create new review in database

        review_check.rating = form.data["rating"]
        review_check.text = form.data["text"]

        db.session.commit()



        # format response body
        new_review_details = {
            "id": review_check.id,
            "user": {"name": current_user.username},
            "sellerId": current_user.id,
            "itemId": product_id,
            "text": new_review.text,
            "date": new_review.date_created,
            "starRating": new_review.rating
        }

        return new_review_details
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
