from .db import db, environment, SCHEMA
from .review import Review


class ReviewImage(db.Model):
    __tablename__ = 'review_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey(Review.id)))
    url = db.Column(db.String(2048), nullable=False)

    review = db.relationship('Review', back_populates='review_images')
