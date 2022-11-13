from flask import Blueprint, jsonify
from flask_login import current_user
from app.models import Review, Product, ReviewImage, User, db


session_routes = Blueprint('session', __name__)


@session_routes.get('/test')
def test_route():
    return 'session'


@session_routes.get('/reviews')
def get_user_reviews():
    """
    gets all reviews by current user session
    """

    # stand in for current_user.id
    # test_user_id = 7


    # checks if user is authenticated
    if current_user.is_authenticated:
        # combines all the data from the different tables and labels the different joined tables for all of the required review info
        reviews = db.session.query(
                                    Review.id,
                                    Review.user_id,
                                    Review.date_created,
                                    Review.rating,
                                    Review.text,
                                    Product.id.label("itemId"),
                                    Product.name,
                                    ReviewImage.url.label("previewImageURL"),
                                    User.username.label("shopName")
                                    ).join(
                                    Product, Review.product_id == Product.id
                                    ).join(
                                    ReviewImage, Review.id == ReviewImage.review_id
                                    ).join(
                                    User, Product.user_id == User.id
                                    ).all()


#formats, creates, and returns for the current user the list of dictionaries containing the reviews created by the user
        reviews = [
            {
                "id": row.id,
                "item" : {
                            "itemId": row.itemId,
                            "name": row.name,
                            "previewImageURL": row.previewImageURL,
                            "shopName": row.shopName,
                },
                "text": row.text,
                "starRating": row.rating,
                "date": row.date_created
            } for row in reviews if row.user_id == current_user.id
        ]

        return jsonify({"userReviews": reviews})
    else:
        return {"message": "Forbidden"}, 403
