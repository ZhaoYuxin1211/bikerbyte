import traceback
import requests
import json
from DAO import dbinfo
import datetime


def get_weather_data():
    try:
        r = requests.get(dbinfo.WEATHER_FORCAST, params={"q": dbinfo.WEATHER_CITY, "appid": dbinfo.WEATHER_KEY})
        print(r.text)

        weather_forecast = json.loads(r.text)
        print(weather_forecast.get('list')[1])

        forecast_test = weather_forecast.get('list')[1]
        timestamp = forecast_test.get('dt')
        dt = datetime.datetime.fromtimestamp(timestamp)

        hour = dt.hour
        weekday = dt.weekday()
        print(dt)
        print(hour)
        print(weekday)

        temp = forecast_test.get('main').get('temp')
        wind_speed = forecast_test.get('wind').get('speed')
        print(temp)
        print(wind_speed)

        return json.loads(r.text)
        # time.sleep(60)

    except:
        print(traceback.format_exc())
        return None

get_weather_data()