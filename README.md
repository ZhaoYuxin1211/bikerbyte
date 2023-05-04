# BikerByte - Dublin Bikes Web Application



Watch the guide video：https://www.youtube.com/watch?v=5suCjTiOL48


[![BikerByte Video](https://img.youtube.com/vi/5suCjTiOL48/maxresdefault.jpg)](https://www.youtube.com/watch?v=5suCjTiOL48)

## Introduction
BikerByte is a user-centric standalone web application tailored specifically for Dublin Bikes users, aiming to revolutionize and improve the overall biking experience within the city. The application incorporates a wide array of valuable features, data-driven insights, and real-time information catering to the unique needs of urban cyclists.

![BikerByte App Screenshot](https://user-images.githubusercontent.com/74203373/236268260-a4b4106f-99e3-4dc8-bf2a-546652c04f59.png)

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Functionality](#functionality)
- [Contributors](#contributors)

## Features

### Core Functionalities

- Displaying station markers and basic information
- User-friendly station search feature
- Displaying basic information for the nearest five stations
- Identifying the closest bike station and calculating the most efficient route
- Displaying a dynamic heat map of bike stations
- Displaying stations with adequate available bikes
- Presenting data-driven insights from recent occupancy trends
- Incorporating real-time weather information
- Showcasing predictive and historical information on bike station availability
- Assisting users in planning their biking journeys

### Supporting Functionalities

- Interactive map displaying station markers and basic information
- User-friendly station search functionality
- Presentation of basic information for the five nearest stations as alternative options
- Integration of real-time weather information affecting biking conditions

## Architecture

The BikerByte web application features a backend implemented in Python and a frontend designed using HTML, JavaScript, and CSS, with Jinja serving as the templating engine. The application is deployed on an EC2 server and utilizes an RDS database for data storage.

![Architecture Diagram](https://user-images.githubusercontent.com/74203373/236263096-22df9ffc-adeb-4786-a7df-852e15181af3.jpg)
![image](https://user-images.githubusercontent.com/74203373/236270769-2c2886a1-25ab-4325-96d7-57c01c192986.png)


## Technologies

### Back-end

- Python
- Flask
- Jinja
- Gunicorn
- SQL

### Front-end

- HTML
- JavaScript (Ajax)
- CSS

### Data analytics

- Machine learning (Random Forest Regression algorithm, Python, Pandas)

### Development

- EC2 server
- RDS database
- Web APIs (OpenWeather and JCDecaux)

## Functionality

The BikerByte application delivers real-time information on bike stations, including the current number of available bikes and empty docks, as well as future predictions of bike availability using advanced machine learning algorithms. The application incorporates essential map functionality, enabling users to visualize bike station locations and plan their routes accordingly.

The development process included rigorous testing and optimization to ensure a seamless, fast, and reliable experience for users.

## Contributors

- [Ruiqi Zhao](https://github.com/ZRQ-rikkie)
- [Pingxia Ruan](https://github.com/leslieruan)
- [Yuxin Zhao](https://github.com/ZhaoYuxin1211)
