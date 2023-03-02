import dbinfo
import sqlalchemy as sqla
import pandas as pd

engine = sqla.create_engine(
    "mysql+pymysql://{}:{}@{}:{}/{}".format(dbinfo.DB_USERNAME, dbinfo.DB_PASSWORD, dbinfo.DB_ADDRESS, dbinfo.DB_PORT,
                                            dbinfo.DB_SCHEMA), echo=True)
df = pd.read_sql_table("station", engine)
sql = "select name from station limit 10;"
for row in engine.execute(sql):
    print(row)