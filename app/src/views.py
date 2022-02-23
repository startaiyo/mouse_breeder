from flask import render_template, request, redirect
from models.models import Mouse
from database import db
from app import app

@app.route('/')
def index():
    mice = Mouse.query.all()
    return render_template('top.html')

@app.route('/create', methods = ["POST"])
def create():
    if request.form:
        try:
            mouse = Mouse(
                gene1 = request.form.get("gene1"),
                gene2 = request.form.get("gene2"),
                othergene = request.form.get("othergene"),
                dob = request.form.get("dob")
            )
            db.session.add(mouse)
            db.session.commit()
        except Exception as e:
            print("Failed to add mouse")
    return redirect('/')