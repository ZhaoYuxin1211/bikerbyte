import sqlalchemy
import pandas as pd

engine = sqlalchemy.create_engine('mysql://admin:bikerbyte@localhost:3306/database-bike')
sql_DF = pd.read_sql("SELECT CURRENT_TIMESTAMP;", con=engine, parse_dates=['activity_date'])
