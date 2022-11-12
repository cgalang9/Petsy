from flask import Blueprint, request
from flask_login import login_required, current_user, login_user
from sqlalchemy.orm import joinedload
from ..models import db, Product, Review, OrderProduct, User
from ..forms.create_item_form import CreateProductForm

item_routes = Blueprint('items', __name__)

@item_routes.route('/test')
def test_route():
    return 'items'



@item_routes.post('/')
@login_required
def create_item():
    """
    Creates/posts a new item
    """
    form = CreateProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_product = Product(
            user_id=current_user.get_id(),
            name=form.data['name'],
            price=form.data['price'],
            description=form.data['description']
        )
        db.session.add(new_product)
        db.session.commit()

        #Gets all reviews of store then calculates avg rating
        reviews = Review.query.join(Product).filter(Product.user_id == current_user.get_id()).options(joinedload(Review.product)).all()
        avg_rating = 0
        for review in reviews:
            avg_rating += review.rating
        avg_rating /= len(reviews)

        #Gets all reviews of store then calculates number of sales
        orders = OrderProduct.query.join(Product).filter(Product.user_id == current_user.get_id()).options(joinedload(OrderProduct.product)).all()
        sales = 0
        for order in orders:
            sales += order.quantity

        prod = {
            "id": new_product.id,
            "sellerId": current_user.get_id(),
            "name": new_product.name,
            "shopName": current_user.username,
            "price": new_product.price,
            "avgShopRating": avg_rating,
            "shopSales": sales,
            "description": new_product.description,
            "shopReviews": len(reviews),
            "itemReviews": 0,
            "imageURLs": []
        }

        return prod
    else:
        return 'error'


        # return prod
    # else:
    #     return '<h1>Bad Data</h1>'
