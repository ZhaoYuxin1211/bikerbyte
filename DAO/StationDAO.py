import json

import dbinfo
import sqlalchemy as sqla
import pandas as pd
from datetime import datetime

# stationDic = {
#     'number': 0,
#     'address': "address",
#     'banking': "banking",
#     'bikeStands': 0,
#     'name': "name",
#     'positionLat': 0,
#     'positionLng': 0,
#     'lastUpdate': 0,
#     'availableBikes': 0,
#     'availableBikeStands': 0,
#     'status': 0
# }

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
        stationDic = {}
        stationDic['number'] = row.number
        stationDic['address'] = row.address
        stationDic['banking'] = row.banking
        stationDic['bikeStands'] = row.bike_stands
        stationDic['name'] = row.name
        stationDic['positionLat'] = row.position_lat
        stationDic['positionLng'] = row.position_lng
        # convert timestamp to datetime
        lastUpdate = datetime.fromtimestamp(float(row.last_update) / 1000)
        stationDic['lastUpdate'] = str(lastUpdate)
        stationDic['availableBikes'] = row.available_bikes
        stationDic['availableBikeStands'] = row.available_bike_stands
        stationDic['status'] = row.status
        # print(stationDic)
        stations.append(stationDic)
        # print(stations)
    # stationData = json.dumps(stations)
    # print(stations)

    return stations


# StationDAO()
