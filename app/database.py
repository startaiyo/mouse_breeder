from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from src import app

db = SQLAlchemy(app)


def init_db(app):
    db.init_app(app)
    Migrate(app, db)