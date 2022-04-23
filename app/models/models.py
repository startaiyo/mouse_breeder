from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from database import db
from sqlalchemy.schema import UniqueConstraint

class Mouse(db.Model):
    __tablename__ = 'mice'
    __table_args__ = (db.UniqueConstraint("gene1", "gene2", "othergene", name="uq_user_00"),)
    id = db.Column(db.Integer, primary_key = True)
    gene1 = db.Column(db.String(255), nullable = False, default = "WT")
    gene2 = db.Column(db.String(255), nullable = False, default = "WT")
    othergene = db.Column(db.String(255), default = None)
    dob = db.Column(db.DateTime, nullable = False)
    # # children = db.relationship("Mouse",cascade="delete")

class MouseCount(db.Model):
    __tablename__ = 'mouse_counts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("mouse.id"))
    count = db.Column(db.Integer)
