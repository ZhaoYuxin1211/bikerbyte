import traceback
import requests
import json
from DAO import dbinfo
import datetime

'''
get weather forecast info for model prediction
this function will return data and it's according feature lists
'''


def get_weather_forecast():
    try:
        # get json from weather api
        r = requests.get(dbinfo.WEATHER_FORCAST, params={"q": dbinfo.WEATHER_CITY, "appid": dbinfo.WEATHER_KEY})
        weather_forecast = json.loads(r.text)

        X_features = []
        dates = []
        for forecast_each in weather_forecast.get('list'):
            timestamp = forecast_each.get('dt')
            dt = datetime.datetime.fromtimestamp(timestamp)
            hour = dt.hour
            weekday = dt.weekday()
            temp = forecast_each.get('main').get('temp')
            wind_speed = forecast_each.get('wind').get('speed')

            dates.append(dt)
            X_features.append([hour, temp, wind_speed, weekday])
        return dates, X_features

    except:
        print(traceback.format_exc())
        return None


def get_weather_forecast_to_show():
    try:
        # get json from weather api
        r = requests.get(dbinfo.WEATHER_FORCAST, params={"q": dbinfo.WEATHER_CITY, "appid": dbinfo.WEATHER_KEY})
        weather_forecast = json.loads(r.text)

        weatherForecastInfo = []
        for weather in weather_forecast.get('list'):
            timestamp = weather.get('dt')
            dt = datetime.datetime.fromtimestamp(timestamp)
            hour = dt.hour
            current_hour = datetime.datetime.now().hour
            # api only provide hour: 1\4\7\10\13\16\19\22 weather report
            if (hour == current_hour) or (hour - 1 == current_hour) or (hour + 1 == current_hour):
                date = dt.date()
                main = weather.get('weather')[0].get('main')
                temp = weather.get('main').get('temp')
                weatherForecastInfo.append([date, main, temp])

        return weatherForecastInfo

    except:
        print(traceback.format_exc())
        return None


get_weather_forecast_to_show()
