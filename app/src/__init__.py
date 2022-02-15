from flask import Flask
from database import init_db

app = Flask(__name__)
app.config.from_object('config.Config')
init_db(app)

import src.views