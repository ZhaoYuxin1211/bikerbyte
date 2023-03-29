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
    # stations = json.loads(StationDAO())

    testStation = [{
    "station":
    {
      "address": "JCDecaux Ireland, 52 Oriel Street Lower, Dublin 1",
      "availableBikeStands": 0,
      "availableBikes": 1,
      "banking": 0,
      "bikeStands": 1,
      "lastUpdate": "2023-02-07 16:08:48",
      "name": "ORIEL STREET TEST TERMINAL",
      "number": 507,
      "positionLat": 53.3546,
      "positionLng": -6.24262,
      "status": "OPEN"
    }}]

    return jsonify(station=testStation)



@app.route("/available/<int:station_id>")
def get_available_bikes(station_id):
    # show the station with the given id, the id is an integer
    available = json.loads(StationDAO())

if __name__ == "__main__":

    app.run(debug=True)
print("======================================================================")
print(get_stations())


