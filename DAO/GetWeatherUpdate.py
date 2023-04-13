import traceback
import requests
import json
from DAO import dbinfo
import time


def get_weather_data():
    try:
        r = requests.get(dbinfo.WEATHER_URI, params={"q": dbinfo.WEATHER_CITY, "appid": dbinfo.WEATHER_KEY})
        print(r.text)

        return json.loads(r.text)
        # time.sleep(60)

    except:
        print(traceback.format_exc())
        return None

get_weather_data()