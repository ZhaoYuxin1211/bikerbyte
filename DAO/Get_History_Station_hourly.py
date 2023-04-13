from DAO import dbinfo
import sqlalchemy as sqla
import pandas as pd
from datetime import datetime


def Get_History_Station_hourly():
    # create engine
    engine = sqla.create_engine(
        "mysql+pymysql://{}:{}@{}:{}/{}".format(dbinfo.DB_USERNAME, dbinfo.DB_PASSWORD, dbinfo.DB_ADDRESS,
                                                dbinfo.DB_PORT,
                                                dbinfo.DB_SCHEMA), echo=True)

    # SQL to select station
    sql = """
        SELECT avg(available_bike_stands) as avg_stands,
        avg(available_bikes) as avg_bikes,
        EXTRACT(HOUR FROM STR_TO_DATE(FROM_UNIXTIME(update_date/1000), '%Y-%m-%d %H:%i:%s.%f')) as hourly,
        DAYNAME(STR_TO_DATE(FROM_UNIXTIME(update_date/1000), '%Y-%m-%d %H:%i:%s.%f')) as day_name
        FROM bikerbytedata.history_station
        WHERE number = 2
        GROUP BY hourly, day_name
        ORDER BY hourly;
        """

    # get results
    # results = engine.execute(sql)
    df = pd.read_sql_query(sql, engine)

    # store each result in a station
    # stations are stored in a list
    stationsHistory_avg = []
    for row in df:
        stationHistoryDic = {}
        stationHistoryDic['avg_stands'] = row.avg_stands  # Assuming avg_stands and avg_bikes are of float type
        stationHistoryDic['avg_bikes'] = row.avg_bikes
        stationHistoryDic['hourly'] = row.hourly  # Convert hourly to integer
        stationHistoryDic['day_name'] = row.day_name

        stationsHistory_avg.append(stationHistoryDic)

    return stationsHistory_avg


print(Get_History_Station_hourly())
