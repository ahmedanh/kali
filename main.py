
from flask import Flask, render_template, send_from_directory, send_file
import os

app = Flask(__name__, 
            static_url_path='',
            static_folder='.')

@app.route('/')
def home():
    return send_file('index.html')

@app.route('/<path:path>')
def serve_file(path):
    if os.path.exists(path):
        return send_from_directory('.', path)
    else:
        return send_file('404.html'), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
