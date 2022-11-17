from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(User.id)))
    name = db.Column(db.String(75), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(2000), nullable=False)

    user = db.relationship('User', foreign_keys=[Order.user_id], back_populates='products')
    reviews = db.relationship('Review',  back_populates='product', cascade="all, delete-orphan")
    order_products = db.relationship('OrderProduct', back_populates='product')
    product_images = db.relationship('ProductImage', back_populates='product', cascade="all, delete-orphan")
