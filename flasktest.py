import functools

from flask import Flask, g, render_template,jsonify
from DAO.StationDAO import *
import json


# create flask app, static files are served from "static" directory
app = Flask(__name__, static_folder='Static')
# app.config.from_object('config')

#  this route simply serves 'static/index.html'
@app.route('/')
def root():
    get_stations()
    return render_template('index.html', MAPS_APIKEY=dbinfo.MAP_KEY)
    # return "hello there!"

@app.route("/stations")
def get_stations():
    # get the station data from StationDAO.py the return type is jason string
    stations = StationDAO()
    return jsonify(station=stations)
    # return str(StationDAO())

@app.route("/available/<int:station_id>")
def get_available_bikes(station_id):
    # show the station with the given id, the id is an integer
    available = json.loads(StationDAO())


if __name__ == "__main__":

    app.run(debug=True)
    # print(get_stations())
    # print(type(get_stations()))


