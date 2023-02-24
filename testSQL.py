import sqlalchemy
import pandas as pd

engine = sqlalchemy.create_engine('mysql://admin:bikerbyte@database-bike.cm2v37iz6jos.eu-west-1.rds.amazonaws.com'
                                  ':3306/dbTest01')
sql_DF = pd.read_sql("select * from table_test01;", con=engine)
