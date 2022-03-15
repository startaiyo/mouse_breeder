from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from database import db

class Mouse(db.Model):
    __tablename__ = 'mice'

    id = db.Column(db.Integer, primary_key = True)
    gene1 = db.Column(db.String(255), nullable = False, default = "WT")
    gene2 = db.Column(db.String(255), nullable = False, default = "WT")
    othergene = db.Column(db.String(255), default = None)
    dob = db.Column(db.DateTime, nullable = False)
    # # children = db.relationship("Mouse",cascade="delete")
    # def regist_mouse(mouse):
    #     record = Mouse(
    #         gene1 = mouse['gene1'],
    #         gene2 = mouse['gene2'],
    #         othergene = mouse['othergene'],
    #         dob = mouse['dob']
    #     )
    #     db.session.add(record)
    #     db.session.commit()
    #     return mouse

# class MouseSchema(ma.ModelSchema):
#     class Meta:
#         model = Mouse
#         fields = ('id','gene1','gene2','othergene','dob')