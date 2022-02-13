import sys
sys.dont_write_bytecode = True

from src import app

if __name__ == '__main__':
    host = '0.0.0.0'
    port = 80
    app.run(host=host, port=port, debug=True)