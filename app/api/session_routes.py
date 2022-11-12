from flask import Blueprint
from flask_login import current_user, login_required
from app.models import Order, OrderProduct, ProductImage, Product, db
from sqlalchemy.orm import joinedload

session_routes = Blueprint('session', __name__)

@session_routes.get('/test')
def test_route():
    return 'session'

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
