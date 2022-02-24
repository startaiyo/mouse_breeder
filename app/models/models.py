from database import db

class Mouse(db.Model):
    __tablename__ = 'mice'

    id = db.Column(db.Integer, primary_key = True)
    gene1 = db.Column(db.String(255), nullable = False, default = "WT")
    gene2 = db.Column(db.String(255), nullable = False, default = "WT")
    othergene = db.Column(db.String(255), default = None)
    dob = db.Column(db.DateTime, nullable = False)
    # children = db.relationship("Mouse",cascade="delete")

