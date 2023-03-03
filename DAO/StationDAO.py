import dbinfo
import sqlalchemy as sqla
import pandas as pd
from DAO.Entity.StationEntity import Station
from datetime import datetime


def StationDAO():
    # create engine
    engine = sqla.create_engine(
        "mysql+pymysql://{}:{}@{}:{}/{}".format(dbinfo.DB_USERNAME, dbinfo.DB_PASSWORD, dbinfo.DB_ADDRESS,
                                                dbinfo.DB_PORT,
                                                dbinfo.DB_SCHEMA), echo=True)
    df = pd.read_sql_table("station", engine)

    # SQL to select station
    sql = """
        select * from 
        (select available_bikes, available_bike_stands, status, last_update, number
        from availability
        group by number) a1
        JOIN 
        (select number, name,address, bike_stands, banking, position_lat,position_lng from station) a2
        on a1.number = a2.number;
        """

    # get results
    results = engine.execute(sql)

    # store each result in a station
    # stations are stored in a list
    stations = []
    for row in results:
        station = Station(row.number, row.address, row.banking, row.bike_stands, row.name, row.position_lat,
                          row.position_lng)
        # convert timestamp to datetime
        lastUpdate = datetime.fromtimestamp(float(row.last_update) / 1000)
        station.getAvailability(lastUpdate, row.available_bikes, row.available_bike_stands, row.status)
        stations.append(station)

    return stations
