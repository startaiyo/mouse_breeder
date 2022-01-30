from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return '<h1>hogehogehogehoge</h1><input></input><button>送信</button><table><th>aaa<th><th>bbb</th><tr><td>ccc</td></tr><td>ddd</td></table>'

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0')