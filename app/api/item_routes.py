from flask import Blueprint
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from ..models import db, Product, Review, OrderProduct
from ..forms.create_item_form import CreateProductForm

item_routes = Blueprint('items', __name__)

@item_routes.route('/test')
def test_route():
    return 'items'



@item_routes.post('/')
# @login_required
def create_item():
    form = CreateProductForm()
    if form.validate_on_submit():
        return 'hello'
    else:
        print(form.name)
        return 'byesd'
        # new_product = Product(
        #     user_id=current_user.id,
        #     name=form.data['name'],
        #     price=form.data['price'],
        #     description=form.data['description']
        # )
        # db.session.add(new_product)
        # db.session.commit()
        # final_prod = Product.query.options(joinedload(Product.user)).get(new_product.user_id)
        # reviews = Review.query.options(joinedload(Review.product)).filter(Review.product.user_id == new_product.user_id)
        # orders = OrderProduct.query.options(joinedload(OrderProduct.product)).filter(OrderProduct.product.user_id == new_product.user_id)

        # avg_rating = 0
        # for review in reviews:
        #     avg_rating += review.rating
        # avg_rating /= len(reviews)

        # sales = 0
        # for order in orders:
        #     sales += order.quanitity


        # prod = {
        #     "id": final_prod.id,
        #     "sellerId": final_prod.user_id,
        #     "name": final_prod.name,
        #     "shopName": final_prod.user.name,
        #     "price": final_prod.price,
        #     "avgShopRating": avg_rating,
        #     "shopSales": sales,
        #     "description": final_prod.description,
        #     "shopReviews": len(reviews),
        #     "itemReviews": 0,
        #     "imageURLs": []
        # }
        # return prod
    # else:
    #     return '<h1>Bad Data</h1>'
