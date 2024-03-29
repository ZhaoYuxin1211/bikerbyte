from DAO import dbinfo
import sqlalchemy as sqla
import pandas as pd
import json
from datetime import datetime


def HistroryStationWeekly(stationNumber, weekday):
    # create engine
    engine = sqla.create_engine(
        "mysql+pymysql://{}:{}@{}:{}/{}".format(dbinfo.DB_USERNAME, dbinfo.DB_PASSWORD, dbinfo.DB_ADDRESS,
                                                dbinfo.DB_PORT,
                                                dbinfo.DB_SCHEMA), echo=True)
    # SQL to select station
    sql = """
        SELECT number, update_date, available_bikes, available_bike_stands
        From history_station
        WHERE number = {};
        """.format(stationNumber)

    # get results
    # results = engine.execute(sql)
    df = pd.read_sql_query(sql, engine)
    df['update_date'] = pd.to_datetime(df['update_date'], unit='ms')
    df['hour'] = df['update_date'].dt.hour
    df['weekday'] = df['update_date'].dt.weekday
    df = df[['number', 'available_bikes', 'available_bike_stands', 'hour', 'weekday']]
    df = df.groupby([df['weekday'], df['hour']]).mean()
    df = df.reset_index()
    df = df[df.weekday == weekday]
    js = df.to_json(orient='records')
    history_weekly = json.loads(js)
    return history_weekly


def HistoryStationDAO(number):
    # create engine
    engine = sqla.create_engine(
        "mysql+pymysql://{}:{}@{}:{}/{}".format(dbinfo.DB_USERNAME, dbinfo.DB_PASSWORD, dbinfo.DB_ADDRESS,
                                                dbinfo.DB_PORT,
                                                dbinfo.DB_SCHEMA), echo=True)

    # SQL to select station
    sql = """
        SELECT update_date, available_bikes, available_bike_stands
        From history_station
        WHERE number = {};
        """.format(number)

    # get results
    # results = engine.execute(sql)
    df = pd.read_sql_query(sql, engine)
    df['update_date'] = pd.to_datetime(df['update_date'], unit='ms')
    df['hour'] = df['update_date'].dt.hour
    df['weekday'] = df['update_date'].dt.weekday
    df = df[['available_bikes', 'available_bike_stands', 'hour', 'weekday']]
    df = df.groupby([df['weekday'], df['hour']]).mean()
    df = df.reset_index()
    js = df.to_json(orient='records')
    history_data = json.loads(js)

    return history_data
