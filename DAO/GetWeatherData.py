import time
import traceback
from DAO import dbinfo
import requests
import json
from pprint import pprint


def main():
    while True:
        try:
            r = requests.get(dbinfo.WEATHER_URI, params={"q": dbinfo.WEATHER_CITY, "appid": dbinfo.WEATHER_KEY})
            print(json.loads(r.text))

            weathertext = r.text
            weatherinfo = json.loads(weathertext)
            print(weatherinfo.get('main').get('temp'))
            print(weatherinfo.get('main').get('humidity'))
            print(weatherinfo.get('wind').get('speed'))
            # print(int(round(time.time() * 1000)))
            time.sleep(60)
        except:
            print(traceback.format_exc())


main()
