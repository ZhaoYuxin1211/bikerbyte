## Project Description

#### I.  Project Overview

##### I. I. Introduction

The purpose of this project is to create an all-inclusive, user-centric standalone web application tailored specifically for Dublin Bikes users, with the goal of revolutionizing and improving the overall biking experience within the city. To achieve this, the application will incorporate a wide array of valuable features, data-driven insights, and real-time information that cater to the unique needs of urban cyclists.

##### I. II. App Functionality

###### 1. Core Functionalities

- Descriptions of the Main Tasks the App Performs: 
  - Displaying Station Markers and Basic Information: The application will visually present station markers on an interactive map, enabling users to quickly and easily identify bike station locations across the city. By clicking on a station marker, users can access essential information about each station, such as the number of available bikes, available parking spaces, and operational hours, ensuring they have all the information needed to make informed decisions.
  - User-friendly Station Search Feature: The application will include a user-friendly search functionality that allows users to quickly find a specific station by entering its name, address, or other identifying information. Upon searching, the application will display essential information about the selected station, such as the number of available bikes, available parking spaces, and operational hours, further enhancing the user experience and simplifying the decision-making process.
  - Displaying Basic Information for the Nearest Five Stations: To provide users with alternative options and enhance their biking experience, the application will also display basic information for the five stations nearest to the user-selected station. This feature allows users to make better-informed decisions by comparing the availability of bikes and parking spaces across multiple nearby stations, ensuring they have backup options in case their preferred station is fully occupied or temporarily unavailable.
  - Identifying the Closest Bike Station and Calculating the Most Efficient Route: The system identifies the closest bike station to the user's location and calculates the most efficient route based on factors such as distance.
  - Displaying a Dynamic Heat Map of Bike Stations: The application will visually represent the relative popularity, usage levels, and real-time occupancy of bike stations across the city, empowering users to make informed decisions.
  - Displaying Stations with Adequate Available Bikes: The application will consider factors such as bike availability and station proximity when suggesting stations for starting a journey.
  - Presenting Data-driven Insights from Recent Occupancy Trends: The application will help users understand how factors such as time of day, weather, and special events influence bike usage and station availability.
  - Incorporating Real-time Weather Information: The application will consider weather conditions as they have a significant impact on station occupancy, bike usage patterns, and user safety.
  - Showcasing Predictive and historical Information on Bike Station Availability:  By employing cutting-edge data analytics and machine learning methodologies, it anticipates future demand, thereby enabling users to make well-informed choices regarding their biking endeavors.
  - Assisting Users in Planning Their Biking Journeys: The application will offer valuable data, personalized recommendations, and user-friendly tools to simplify the process and optimize the overall experience.
- How the App Stands Out from Competitors: 
  - The app differentiates itself from competitors by offering a comprehensive, user-centric experience tailored to Dublin Bikes users. Its unique combination of real-time information, data-driven insights, personalized recommendations, and user engagement features sets it apart from other similar applications.

###### 2. Supporting Functionalities

- Features that Enhance User Experience: 
  - Interactive map displaying station markers and basic information 
  - User-friendly station search functionality 
  - Presentation of basic information for the five nearest stations as alternative options 
  - Integration of real-time weather information affecting biking conditions
- Features that Differentiate the App from Others: 
  - Dynamic heat map visually representing station usage levels and occupancy 
  - Advanced data analytics and machine learning techniques for predictive information 
  - Personalized recommendations based on user preferences and biking history 
  - 
###### 3. User Flow

                  ![image](https://user-images.githubusercontent.com/74203373/236265983-82320d6c-195c-4e68-b18f-85be9f991afd.png)


#### II.  Architecture

##### II. I. Overview

Our web application, "BikerByte," features a backend implemented in Python and a frontend designed using HTML, JavaScript, and CSS, with Jinja serving as the templating engine. The application is deployed on an EC2 server and utilizes an RDS database for data storage.

The overall service operates on the EC2 server, where Python scripts are employed to fetch data from web APIs, specifically OpenWeather and JCDecaux, and store it in the database. The machine learning module processes data from the database to create prediction models, which are saved as pickle files for future use. Another Python script generates prediction results, which are subsequently passed to the frontend via Flask.

To ensure a seamless deployment of the BikerByte project, we utilize Gunicorn on the EC2 server, providing a stable and efficient environment for our application.

To ensure the security of the application, the EC2 server has strict inbound rules to limit access to only specific IP addresses.

![figure1](https://user-images.githubusercontent.com/74203373/236263096-22df9ffc-adeb-4786-a7df-852e15181af3.jpg)

![image](https://user-images.githubusercontent.com/74203373/236263843-65b82d9a-38c9-43a5-b471-b66120d31e00.png)

##### II.  Technologies

###### 1. Back-end: Python, Flask, Jinja, Gunicorn, SQL

- **Python**: Python serves as the backbone for the BikerByte application, handling its core functionalities. As the backend language, Python is responsible for processing requests and responses, accessing the database, and performing data analytics tasks.
- **Flask**: The BikerByte project employs Flask, a micro web framework, to build its web application. Flask offers a lightweight and flexible infrastructure for handling HTTP requests and responses, routing requests to appropriate handler functions, and rendering HTML templates.
- **Jinja**: Jinja, a templating language, is used to create dynamic HTML pages for the BikerByte web application. By separating presentation logic from business logic, Jinja simplifies the development process, allowing for more maintainable and scalable applications.
- **Gunicorn**: Gunicorn deploys the BikerByte application on the EC2 server. Designed for speed and reliability, Gunicorn ensures the server can handle high traffic loads effectively.
- **SQL**: SQL, a standard language for managing relational databases, is employed alongside SQLAlchemy, a Python SQL toolkit and Object-Relational Mapping (ORM) library, to interact with databases using Python code. MySQL, a widely-used open-source relational database management system, stores the data for the BikerByte application, while pymysql, a Python package, provides a Python interface to the MySQL database. Together, these technologies manage and store data for the application. SQL defines the database schema, SQLAlchemy interacts with the database through Python code, MySQL serves as the database system, and pymysql connects to it from Python.

###### 2.  Front-end: HTML, JS (Ajax), CSS

- **HTML**: HTML (Hypertext Markup Language) serves as the foundation for creating the structure and content of web pages within the BikerByte application.
- **JavaScript**: JavaScript is employed to make the web pages dynamic and interactive. Specifically, Ajax is utilized for making asynchronous requests to the server and updating parts of the web page without the need for a page refresh, resulting in a more responsive user experience.
- **CSS**: CSS (Cascading Style Sheets) is responsible for styling and formatting web pages, enabling developers to create visually appealing and consistent user interfaces across the BikerByte application.

###### 3.  Data analytics: Machine learning (Random Forest Regression algorithm, Python, Pandas)

- **Random Forest Regression Model**: The Random Forest Regression algorithm is a machine learning technique employed for predicting continuous numerical values using a set of input variables. In the BikerByte application, this algorithm is applied to predict the number of available bikes at each station.
- **Python** and **Pandas**: Python, in conjunction with the Pandas library, is utilized for preprocessing and manipulating data, as well as for training and testing the Random Forest Regression model. This combination allows for streamlined data handling and effective model development.

###### 4.   Development: EC2 server, RDS database, web APIs (OpenWeather and JCDecaux)

- **EC2 server**: In our project, the EC2 server plays a crucial role in deploying the web application and executing Python scripts to retrieve data from external APIs, subsequently storing it in the RDS database.
- **RDS database**: Amazon RDS (Relational Database Service) is a managed database service provided by AWS that makes it easy to set up, operate, and scale a relational database in the cloud. In our project, we use RDS to store the data retrieved from external APIs.
- **Web APIs** (Google maps, OpenWeather and JCDecaux): APIs (Application Programming Interfaces) are interfaces that allow applications to access data or functionality provided by other software systems. In our project, we use three web APIs: Google maps, OpenWeather and JCDecaux. Google maps API is used for displaying bike station locations on a map. OpenWeather provides real-time and forecast weather data, which we use to provide weather information to the user and make available-bike-number prediction. JCDecaux provides real-time bike rental data for the city of Dublin, which we use to show the user the info of each bike station. The Python scripts on the EC2 server retrieve data from OpenWeather and JCDecaux APIs and store it in the RDS database for later use in the web application, however the Python scripts which retrieve data from Google maps API only show information to users.

##### III. Functionality

Our BikerByte application delivers real-time information on bike stations, including the current number of available bikes and empty docks, as well as future predictions of bike availability using advanced machine learning algorithms. Furthermore, the application incorporates essential map functionality, enabling users to visualize bike station locations and plan their routes accordingly.

Throughout the development process, we rigorously tested the application and addressed any performance issues identified during these testing phases. Notably, we encountered performance challenges involving slow data retrieval and extended rendering times for the prediction chart and search button. Initially, our approach involved loading all bike station information before selecting the required stations for rendering. However, we optimized the backend by transmitting only the necessary station information to the frontend. This optimization significantly enhanced the speed and overall performance of our website.

To guarantee the functionality and integrity of our application, we developed a comprehensive suite of test files. These tests encompass a broad spectrum of areas, including weather API integration, map functionality, database read and write operations, and various frontend features. The implementation of these tests has enabled us to identify and rectify any bugs or issues that emerged during development, ensuring that our BikerByte application is reliable, robust, and ready to serve users effectively.
