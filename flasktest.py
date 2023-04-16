from flask import Flask, render_template,jsonify
from DAO.StationDAO import *
# from DAO.GetWeatherData import *
from DAO.GetWeatherUpdate import *
from model.ModelDes import *
from model.get_weather_forecast_info import *
from DAO.HistoryStationDAO import *


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
    stations = StationDAO.StationDAO()
    return jsonify(stations=stations)


@app.route("/weather")
def get_weather():
    weather_data = get_weather_data()
    return jsonify(weather=weather_data)

@app.route("/weatherForecast")
def get_weather_forecast():
    forecast = get_weather_forecast_to_show()
    return jsonify(forecast=forecast)

@app.route("/history/<int:station_id>")
def get_history_avg_available(station_id):
    # get the avg_available bikes data from historysattionDAO
    history_data = HistoryStationDAO(station_id)
    # get the data
    available_bikes = [d['available_bikes'] for d in history_data]
    available_bike_stands = [d['available_bike_stands'] for d in history_data]
    hour = [d['hour'] for d in history_data]
    weekday = [d['weekday'] for d in history_data]
    return jsonify(available_bikes=available_bikes, available_bike_stands=available_bike_stands, hour=hour, weekday=weekday)

@app.route("/history/<int:station_id>/<int:weekday>")
def  get_history_weekly(station_id,weekday):
    history_weekly = HistroryStationWeekly(station_id, weekday)
    return jsonify(history_weekly = history_weekly)


@app.route("/available/<int:station_id>")
def get_available_bikes(station_id):
    # Get all station data
    all_stations = StationDAO.StationDAO()
    # Find the station with the given ID
    station = next((s for s in all_stations if s['number'] == station_id), None)
    if station is None:
        # Station not found
        return jsonify(error='Station not found'), 404
    available_bikes = station['availableBikes']
    return jsonify(available=available_bikes)

# predict by each
@app.route("/predictEach/<int:station_id>")
def get_predict_each(station_id):
    predict_data = predict_station(station_id)
    return jsonify(predict=predict_data)

# predict tool by each
@app.route("/ToolsEach/<int:station_id>")
def get_predict_tools_each(station_id):
    predict_tools_each = predict_dict_each(station_id)
    return jsonify(value=predict_tools_each)


@app.route("/predictchart")
def get_predict():
    predict_data = predict_collect()
    return jsonify(predict=predict_data)

@app.route("/predicttools")
def get_predict_tools():
    predict_tools_data = predict_dict()
    return jsonify(value=predict_tools_data)



if __name__ == "__main__":

    app.run(debug=True)




