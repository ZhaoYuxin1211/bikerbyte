import pickle
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
    # get station's model
    model = get_predict_model(station_num)
    # make prediction
    predict_available_bikes = model.predict(X_features)
    return times, predict_available_bikes


# predict output by each station for display predict chart
def predict_station(stationNumber):
    predict_each = []
    times, availables = predict(stationNumber)
    for j in range(len(times)):
        predict_each.append([times[j], availables[j]])
    return predict_each


# predict each station for display the Plan a ride func
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

        if date_key not in predict_each:
            predict_each[date_key] = {}

        predict_each[date_key][time_key] = available
    return predict_each



