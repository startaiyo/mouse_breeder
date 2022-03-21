from flask import render_template, request, redirect
from models.models import Mouse
from app import app
from database import db
import sys

@app.route('/')
def index():
    mice = Mouse.query.all()
    return render_template('top.html',mice=mice)

@app.route('/create', methods = ["POST"])
def create():
    print(request.form, flush=True)
    if request.form:
        try:
            mouse = Mouse(
                gene1 = request.form.get("gene1"),
                gene2 = request.form.get("gene2"),
                othergene = request.form.get("othergene"),
                dob = request.form.get("dob")
            )
            print(db.session, flush=True)
            db.session.add(mouse)
            db.session.commit()
        except Exception as e:
            print("Failed to add mouse", flush=True)
    return redirect('/')