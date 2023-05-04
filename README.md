#### Architecture

##### I. Overview

Our web application, "BikerByte," features a backend implemented in Python and a frontend designed using HTML, JavaScript, and CSS, with Jinja serving as the templating engine. The application is deployed on an EC2 server and utilizes an RDS database for data storage.

The overall service operates on the EC2 server, where Python scripts are employed to fetch data from web APIs, specifically OpenWeather and JCDecaux, and store it in the database. The machine learning module processes data from the database to create prediction models, which are saved as pickle files for future use. Another Python script generates prediction results, which are subsequently passed to the frontend via Flask.

To ensure a seamless deployment of the BikerByte project, we utilize Gunicorn on the EC2 server, providing a stable and efficient environment for our application.

To ensure the security of the application, the EC2 server has strict inbound rules to limit access to only specific IP addresses.

![figure1](https://user-images.githubusercontent.com/74203373/236263096-22df9ffc-adeb-4786-a7df-852e15181af3.jpg)

<img width="606" alt="figure2" src="https://user-images.githubusercontent.com/74203373/236263163-45462161-1866-463c-b5c3-5c6a078f6ac8.png">

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
