# from flask import Flask
# app = Flask(__name__)
# @app.route("/")
# def hello():
#     return "Hello World!"
# if __name__ == "__main__":
#     app.run(debug=True)

# !/usr/bin/env python
from flask import Flask

# Create our flask app. Static files are served from 'static' directory
app = Flask(__name__, static_url_path='')

# this route simply serves 'static/index.html'
@app.route('/')
def root():
    return app.send_static_file('indedx.html')

if __name__ == "__main__":
    app.run(debug=True)
