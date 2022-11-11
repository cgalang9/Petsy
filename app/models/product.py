from .db import db, environment, SCHEMA
from .user import User


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    name = db.Column(db.String(75), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(2000), nullable=False)

    user = db.relationship('User', back_populates='products', cascade="all, delete-orphan")
    reviews = db.relationship('Review', back_populates='product')
    order_products = db.relationship('OrderProduct', back_populates='products')
    product_images = db.relationship('ProductImage', back_populates='product_images')
