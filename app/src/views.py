from flask import render_template, request, redirect, url_for
from models.models import Mouse
from app import app
from database import db
import sys, datetime
import numpy as np
import cv2
import os

# 処理した画像ファイルの保存先
IMG_DIR = "/static/images/"
BASE_DIR = os.path.dirname(__file__)
IMG_PATH = BASE_DIR + IMG_DIR

# 保存先のパスがなければ作成
if not os.path.isdir(IMG_PATH):
    os.mkdir(IMG_PATH)

def rgb_to_gray(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    return gray

@app.route('/')
def index():
    mice = Mouse.query.all()
    today = datetime.date.today()
    return render_template('top.html',mice=mice, today=today)

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
            db.session.add(mouse)
            db.session.commit()
        except Exception as e:
            print("Failed to add mouse", flush=True)
    return redirect('/')

@app.route('/<int:id>/delete',methods = ["POST"])
def delete(id):
    try:
        mouse = Mouse.query.get(id)
        db.session.delete(mouse)
        db.session.commit()
    except Exception as e:
        print("Failed to delete mouse", flush=True)
    return redirect('/')

@app.route('/upload',methods = ["POST"])
def upload():
    img_name = ""
    mice = Mouse.query.all()
    if request.method == 'POST':
        # 画像をロード
        stream = request.files['image'].stream
        img_array = np.asarray(bytearray(stream.read()), dtype=np.uint8)

        # 画像データ用配列にデータがあれば
        if len(img_array) != 0:
            img = cv2.imdecode(img_array, 1)
            # グレースケール変換
            gray = rgb_to_gray(img)
            now_date = datetime.datetime.now()
            img_name = "gray" + now_date.strftime('%Y-%m-%d-%H-%M-%S') + ".png"
            # 画像の保存
            cv2.imwrite(os.path.join(IMG_PATH + img_name), gray)
        
        ### マーカーの設定

        marker_dpi = 72 # 画面解像度(マーカーサイズ)
        scan_dpi = 300 # スキャン画像の解像度

        # グレースケール (mode = 0)でファイルを読み込む
        marker=cv2.imread(os.path.join(IMG_PATH + 'marker.jpeg'),0) 

        # マーカーのサイズを取得
        w, h = marker.shape[::-1]

        # マーカーのサイズを変更
        marker = cv2.resize(marker, (int(h*scan_dpi/marker_dpi), int(w*scan_dpi/marker_dpi)))
    return render_template('top.html', img_name=img_name, mice=mice)