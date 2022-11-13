from flask import Blueprint, jsonify
from app.models import Review, Product, User, db

seller_routes = Blueprint('sellers', __name__)

@seller_routes.get('/test')
def test_route():
    return 'seller'

@seller_routes.get("/<int:id>/reviews")
def get_seller_reviews(id):
    seller_id = id

    print(seller_id)

    seller_reviews = db.session.query(
                                    Review.id,
                                    Product.user_id.label("sellerId"),
                                    Review.date_created,
                                    Review.rating,
                                    Review.text,
                                    Product.id.label("itemId"),
                                    Product.name,
                                    User.username.label("shopName")
                                    ).join(
                                    Product, Review.product_id == Product.id
                                    ).join(
                                    User, Product.user_id == User.id
                                    ).all()


    seller_reviews = [
                {
                    "id": row.id,
                    "user" : { "name": row.user },
                    "sellerId": row.sellerId,
                    "text": row.text,
                    "starRating": row.rating,
                    "date": row.date_created
                } for row in seller_reviews if row.user_id == seller_id
            ]

    if seller_reviews:
        return jsonify({"sellerReviews": seller_reviews})
    else:
        return {"message": "Forbidden"}, 403

    return "getsellerreviews"
