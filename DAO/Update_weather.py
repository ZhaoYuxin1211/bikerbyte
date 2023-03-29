import dbinfo
import json
import sqlalchemy as sqla
import traceback
import requests
import time

# database
engine = sqla.create_engine(
    "mysql+pymysql://{}:{}@{}:{}/{}".format(dbinfo.DB_USERNAME, dbinfo.DB_PASSWORD, dbinfo.DB_ADDRESS, dbinfo.DB_PORT,
                                            dbinfo.DB_SCHEMA), echo=True)


def history_stations_to_db(weathertext):
    weatherinfo = json.loads(weathertext)
    cur_time = int(round(time.time() * 1000))

    vals = (
        cur_time, float(weatherinfo.get('main').get('temp')), float(weatherinfo.get('main').get('humidity')),
        float(weatherinfo.get('wind').get('speed')))
    engine.execute(
        "INSERT INTO weather_data(time, temp, humidity, wind_speed"
        ") VALUES (%s,%s,%s,%s)", vals)
    return


def main():
    while True:
        try:
            weather_r = requests.get(dbinfo.WEATHER_URI, params={"q": dbinfo.WEATHER_CITY, "appid": dbinfo.WEATHER_KEY})

            history_stations_to_db(weather_r.text)

            time.sleep(10 * 60)  # update every 10min
        except:
            print(traceback.format_exc())
            if engine is None:
                return


main()
