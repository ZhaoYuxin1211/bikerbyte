import sqlite3
from DAO import dbinfo
from flask import Flask, g, render_template, jsonify
from sqlalchemy import create_engine
from DAO import StationDAO



# create flask app, static files are served from "static" directory
app = Flask(__name__,static_folder='static')
# app.config.from_object('config')



@app.route('/')
def root():
    # return render_template('index.html', MAPS_APIKEY=dbinfo.MAP_KEY)
    return "hello there!"

@app.route("/stations")
def get_stations():
    # get the station data from StationDAO.py
    StationDAO()
    stationsdata = stations[]
    return jsonify(stations=stationsdata)


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
