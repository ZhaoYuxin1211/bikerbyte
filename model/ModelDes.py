import pickle
from DAO import StationDAO
import pandas as pd
import numpy as np
from datetime import datetime

from flask import jsonify
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

from model.get_weather_forecast_info import get_weather_forecast


def get_predict_model(station_num):
    """get station's model"""
    # running the flask using path 'model/randomForestReg/model'
    model_path = 'model/randomForestReg/model' + str(station_num) + '.pkl'
    # running the function in this file use path 'randomForestReg/model'
    # model_path = 'randomForestReg/model' + str(station_num) + '.pkl'
    with open(model_path, 'rb') as handle:
        model = pickle.load(handle)
    return model



def predict(station_num):
    # get times and features for prediction
    times, X_features = get_weather_forecast()
    # print(times)
    # get station's model
    model = get_predict_model(station_num)
    # make prediction
    predict_available_bikes = model.predict(X_features)
    return times, predict_available_bikes
#
#
# #output is list which suit the format Google chart needed
# def predict_collect():
#     predict_sum = {}
#     stations = StationDAO.StationDAO()
#
#     # except the last one in stations.
#     for station in stations[:-1]:
#         predict_each = []
#         times, availables = predict(station['number'])
#         for j in range(len(times)):
#             predict_each.append([times[j], availables[j]])
#         predict_sum[station['number']] =predict_each
#     # print(predict_sum)
#     return predict_sum

# print(predict_collect())
        # output is dict,used to make the search function for predict
# def predict_dict():
#     predict_sum = {}
#     stations = StationDAO.StationDAO()
#     # except the last one in stations.
#     for station in stations[:-1]:
#         predict_each = {}
#         times, availables = predict(station['number'])
#         for j in range(len(times)):
#             date = times[j].date()
#             time = times[j].time()
#             available = availables[j]
#
#             date_key = str(date)  # to string
#             time_key = str(time)  # to string
#
#             # time_key = (time.hour, time.minute, time.second)
#
#             if date_key not in predict_each:
#                 predict_each[date_key] = {}
#
#             predict_each[date_key][time_key] = available
#
#         predict_sum[station['number']] = predict_each
#
#     return predict_sum

# predict output by each station
def predict_station(stationNumber):
    # predict_sum = predict_collect()
    # return predict_sum[stationNumber]

        predict_each = []
        times, availables = predict(stationNumber)
        for j in range(len(times)):
            predict_each.append([times[j], availables[j]])
        return predict_each



def predict_dict_each(stationNumber):
    # predict_sum = predict_dict()
    # return predict_sum[stationNumber]
    predict_each = {}
    times, availables = predict(stationNumber)
    for j in range(len(times)):
        date = times[j].date()
        time = times[j].time()
        available = availables[j]

        date_key = str(date)  # to string
        time_key = str(time)  # to string

        # time_key = (time.hour, time.minute, time.second)

        if date_key not in predict_each:
            predict_each[date_key] = {}

        predict_each[date_key][time_key] = available
    return predict_each


print(predict_dict_each(1))










