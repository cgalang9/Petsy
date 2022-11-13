from flask import Blueprint, jsonify
from flask_login import current_user
from app.models import Review, Product, ReviewImage, User, db

from flask import Blueprint
from flask_login import current_user, login_required
from app.models import Order, OrderProduct, ProductImage, Product, db
from sqlalchemy.orm import joinedload

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

@session_routes.get('/orders')
@login_required
def get_orders():
    """
    gets all orders of session user and formats them
    """
    # eager loads orders, order products, products, and product seller information
    orders = Order.query.options(joinedload(Order.order_products, OrderProduct.product, Product.user)).filter(Order.user_id==current_user.id).all()
    order_dicts = [order.to_dict() for order in orders]
    # loops through order dictionaries to format
    for order_dict in order_dicts:
        items = order_dict['items']
        formatted_items=[]
        # loops through items in each order to format and add product/seller information
        for item in items:
            # query for preview image url
            preview_image_url=ProductImage.query.filter(ProductImage.product_id==item.product_id).filter(ProductImage.preview_image==True).all()[0].url
            item_dict = {
                "id": item.id,
                "previewImageURL": preview_image_url,
                "name": item.product.name,
                "purchasePrice": item.item_price,
                "shopName": item.product.user.username
            }
            formatted_items.append(item_dict)
        order_dict['items']=formatted_items
    return order_dicts
