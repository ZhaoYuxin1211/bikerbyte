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

            # json.loads(r.text)

            pprint(json.loads(r.text))

            time.sleep(5 * 60)
        except:
            print(traceback.format_exc())


main()
