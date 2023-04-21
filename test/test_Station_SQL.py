import sqlalchemy
import pymysql
import pandas as pd

engine = sqlalchemy.create_engine('mysql+pymysql://admin:bikerbyte@database-bike.cm2v37iz6jos.eu-west-1.rds.amazonaws'
                                  '.com:3306/bikerbytedata')

# Check database connection
for res in engine.execute("SHOW VARIABLES;"):
    print(res)

# Analyse the data from the station table
sql_DF1 = pd.read_sql("select * from Station;", con=engine)
print(sql_DF1)

# Analyse the data from the availability table
sql_DF2 = pd.read_sql("select * from Availability;", con=engine)
print(sql_DF2)

