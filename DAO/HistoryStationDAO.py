from DAO import dbinfo
import sqlalchemy as sqla
import pandas as pd
from datetime import datetime

def HistoryStationDAO():
    # create engine
    engine = sqla.create_engine(
        "mysql+pymysql://{}:{}@{}:{}/{}".format(dbinfo.DB_USERNAME, dbinfo.DB_PASSWORD, dbinfo.DB_ADDRESS,
                                                dbinfo.DB_PORT,
                                                dbinfo.DB_SCHEMA), echo=True)

    # SQL to select station
    sql = """
        select number, update_date, available_bikes
        from history_station
        """

    # get results
    results = engine.execute(sql)

    # store each result in a station
    # stations are stored in a list
    stationsHistory = []
    for row in results:
        stationHistoryDic = {}
        stationHistoryDic['number'] = row.number
        # convert timestamp to datetime
        lastUpdate = datetime.fromtimestamp(float(row.update_date) / 1000)
        stationHistoryDic['lastUpdate'] = str(lastUpdate)
        stationHistoryDic['availableBikes'] = row.available_bikes

        stationsHistory.append(stationHistoryDic)


    return stationsHistory


print(HistoryStationDAO())