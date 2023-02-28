# web API crawling
import datetime

from sqlalchemy.sql.functions import now
import dbinfo
import json
import sqlalchemy as sqla
import pymysql
from sqlalchemy import create_engine
import traceback
import glob
import os
from pprint import pprint

import simplejson as json
import requests
import time

from IPython.display import display

# do not assign the database at first.
URI = "database-bike.cm2v37iz6jos.eu-west-1.rds.amazonaws.com"
PORT = "3306"
USER = "admin"
PASSWORD = "bikerbyte"
DB_SCHEMA = "bikerbytedata"

# using mysql + pymysql, not the same as the slides.
engine = sqla.create_engine("mysql+pymysql://{}:{}@{}:{}/{}".format(USER, PASSWORD, URI, PORT, DB_SCHEMA), echo=True)


# def write_to_file(text):
#     with open("data/bike_{}".format(now).replace(" ", "_"), "w") as f:
#         f.write(r.text)

def stations_to_db(text):
    stations = json.loads(text)
    print(type(stations), len(stations))
    # print(stations)
    for station in stations:
        print(station)
        vals = (
            int(station.get('number')), station.get('last_update'), int(station.get('available_bikes')),
            int(station.get('available_bike_stands')), station.get('status'))
        engine.execute("insert into station values(%s,%s,%s,%s,%s)", vals)
    return


def availability_to_db(text):
    availability = json.loads(text)
    print(type(availability), len(availability))
    for a in availability:
        print(availability)
        vals = (
            int(a.get('number')), a.get('address'), int(a.get('banking')),
            a.get('bike_stands'), a.get('name'), a.get('position').get('lat'),
            a.get('position').get('lng'))
        engine.execute("insert into station values(%s,%s,%s,%s,%s,%s,%s)", vals)
    return


def main():
    while True:
        try:
            now = datetime.datetime.now()
            r = requests.get(dbinfo.STATIONS_URI, params={"apiKey": dbinfo.JCKEY, "contract": dbinfo.NAME})
            print(r, now)
            # write_to_file(r.text)
            stations_to_db(r.text)
            availability_to_db(r.text)
            time.sleep(5 * 60)
        except:
            print(traceback.format_exc())
            if engine is None:
                return


main()