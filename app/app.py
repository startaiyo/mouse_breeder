from flask import Flask
from database import init_db

def create_app():
    app = Flask(__name__,static_folder='src/static')
    app.config.from_object('config.Config')
    init_db(app)
    return app

app = create_app()
