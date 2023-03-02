import time
import traceback

from DAO import dbinfo
import requests
import json
from pprint import pprint


def main():
    while True:
        try:
            r = requests.get(dbinfo.STATIONS_URI, params={"apiKey": dbinfo.JCKEY, "contract": dbinfo.NAME})

            # json.loads(r.text)

            pprint(json.loads(r.text))

            time.sleep(30)
        except:
            print(traceback.format_exc())


main()
