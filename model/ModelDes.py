import pickle
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
    model_path = 'randomForestReg/model' + str(station_num) + '.pkl'
    with open(model_path, 'rb') as handle:
        model = pickle.load(handle)
    return model



def predict(station_num):
    # get times and features for prediction
    times, X_features = get_weather_forecast()
    # get station's model
    model = get_predict_model(station_num)
    # make prediction
    predict_available_bikes = model.predict(X_features)
    return times, predict_available_bikes

