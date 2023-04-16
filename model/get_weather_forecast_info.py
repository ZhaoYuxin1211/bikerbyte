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

            print(dates,X_features)

        return dates, X_features

    except:
        print(traceback.format_exc())
        return None


get_weather_forecast()