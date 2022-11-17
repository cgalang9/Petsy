from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from datetime import datetime


class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(User.id)))
    total_price = db.Column(db.Float, nullable=False)
    order_datetime = db.Column(db.DateTime, nullable=False, default=datetime.today())

    user = db.relationship('User', back_populates='orders')
    order_products = db.relationship('OrderProduct', back_populates='order')
