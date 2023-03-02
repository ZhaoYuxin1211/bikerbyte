import sqlite3
import dbinfo
from flask import Flask, g, render_template, jsonify
import json
from sqlalchemy import create_engine

# create flask app, static files are served from "static" directory
app = Flask(__name__,static_folder='static')
# app.config.from_object('config')


# db info
USER = dbinfo.DB_USERNAME
PASSWORD = dbinfo.DB_PASSWORD
URI = dbinfo.DB_ADDRESS
PORT = dbinfo.DB_PORT
DB_SCHEMA = dbinfo.DB_DATABASE

# using mysql + pymysql, not the same as the slides.
engine = create_engine(
    "mysql+pymysql://{}:{}@{}:{}/{}".format(USER, PASSWORD, URI, PORT, DB_SCHEMA), echo=True)


def connect_to_database():
    engine = create_engine("mysql+pymysql://{}:{}@{}:{}/{}".format(USER, PASSWORD, URI, PORT, DB_SCHEMA), echo=True)
    conn = engine.connect()
    return conn


# this route simply serves "static/index.html'
@app.route('/')
def root():
    return render_template('index.html', MAPS_APIKEY=dbinfo.MAP_KEY)
    # return "hello there!"

@app.route("/stations")
def get_stations():
    conn = connect_to_database()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    stations = []
    rows = cur.execute("SELECT * from stations;")
    for row in rows:
        stations.append(dict(row))
    return jsonify(stations=stations)


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, "database", None)
    if db is not None:
        db.close()


@app.route("/available/<int:station_id>")
def get_available_bikes(station_id):
    conn = connect_to_database()
    data = []
    rows = conn.execute(
        "SELECT available_bikes from stations where number = {};".format(station_id))
    for row in rows:
        data.append(dict(row))

    return jsonify(available=data)


if __name__ == "__main__":
    app.run(debug=True)
