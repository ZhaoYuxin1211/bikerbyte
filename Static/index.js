//----------------------------------------------------- adding marker function-----------------------------------------
function addMarkers(data) {
    const stations = data.stations;
    //add markers array.
    stations.forEach((station) => {
        var markerIcon = "";
        //    color palette : https://coolors.co/palette/ff6b35-f7c59f-efefd0-004e89-1a659e
        if (station.availableBikes == 0) {
            markerIcon = {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: "#efefd0",
                fillOpacity: 0.8,
                strokeColor: "white",
                strokeWeight: 1,
                scale: 12,
            };
        } else if (station.availableBikes >= 0 && station.availableBikes <= 5) {
            markerIcon = {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: "#f7c59f",
                fillOpacity: 0.8,
                strokeColor: "white",
                strokeWeight: 1,
                scale: 12,
            };
        } else if (station.availableBikes > 5 && station.availableBikes <= 10) {
            markerIcon = {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: "#ff6b35",
                fillOpacity: 0.8,
                strokeColor: "white",
                strokeWeight: 1,
                scale: 12,
            };
            // markerIcon = "https://i.postimg.cc/HnRsbFjZ/map.png";
            // markerIcon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
        } else {
            markerIcon = {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: "#1a659e",
                fillOpacity: 0.8,
                strokeColor: "white",
                strokeWeight: 1,
                scale: 12,
            };
        }
        var marker = new google.maps.Marker({
            position: {
                lat: Number(station.positionLat),
                lng: Number(station.positionLng),
            },
            map: map,
            title: station.name,
            station_number: station.number,
            icon: markerIcon,
            // set the available bikes as the marker label
            label: {
                text: station.availableBikes.toString(),
                color: "#ffffff", // set the color of the label to white
                fontSize: "10px", // set the font size of the label to 14px
                fontWeight: "bold", // set the font weight of the label to bold
            },
        });
        // creates markers with info box with information
        var infoWindow = new google.maps.InfoWindow({
            content:
                '<div id="content"><h6>' +
                "No." +
                station.number +
                " " +
                station.name +
                " " +
                '<span id="status" class="badge badge-primary">' +
                "Now: " +
                station.status +
                "</span>" +
                "</h6></div>" +
                '<center><div id="station_availability"><h6>' +
                "Available Bikes: " +
                station.availableBikes +
                "</h6></div></center>" +
                '<center><div id="station_availability"><h6>' +
                "Available Stands: " +
                station.availableBikeStands +
                "</h6></div></center>",
        });

        // makes the info box if you mouseover the box
        marker.addListener("mouseover", function () {
            if (infoWindow.getMap() == null) {
                // infoWindow is not open
                infoWindow.open(map, marker);
            } else {
                // infoWindow is open, close it
                infoWindow.close();
            }
        });
        // makes the info box close when mouseout
        marker.addListener("mouseout", function () {
            infoWindow.close();
        });
        // click the marker,zoom the map and  set marker position as the center of the map
        marker.addListener("click", function () {
            map.setZoom(17); // set zoom level to 17
            map.setCenter(marker.getPosition()); // set marker position as the center of the map
            document.getElementById("search-input").value = station.name;
            const today_date = new Date().getDay();
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayOfWeek = daysOfWeek[today_date];
            document.getElementById("show_date").innerHTML = "Today: " + dayOfWeek;
            // Retrieve information for station
            var stationName = this.getTitle();
            var stationNumber = station.number;
            var availableBikes = station.availableBikes;
            var availableBikeStands = station.availableBikeStands;

            // display the station info
            document.getElementById("info-box").innerHTML =
                "<br><h6><div class='clicked-station-name' stationName='" +
                stationName +
                "'>" +
                stationName +
                "</div></h6><div class='clicked-station' stationNumber='" +
                stationNumber +
                "'>Station Number: " +
                stationNumber +
                "</div><div>Available Bikes: " +
                availableBikes +
                "</div><div>Available Bike Stands: " +
                availableBikeStands +
                "</div><br><div class='d-flex justify-content-between align-items-center'>" +
                "<button id='toggle1' class='btn btn-primary flex-fill me-1' type='button' data-bs-toggle='offcanvas' data-bs-target='#offcanvasScrolling' aria-controls='offcanvasScrolling'>Information Charts</button>" +
                "<button id='toggle2' class='btn btn-primary flex-fill ms-1' type='button' data-bs-toggle='offcanvas' data-bs-target='#offcanvasWithBackdrop' aria-controls='offcanvasWithBackdrop'>Plan a Ride</button>" + "</div>";
            const targetStation = station;
            displayFiveNearestStations(stations, targetStation);
            displayHistoryHourly(stationNumber);
            dispalyPredictChart(stationNumber);
        });
    });
}

//----------------------------------------------------- adding search functions-----------------------------------------
const searchBtn = document.getElementById("search-btn");

function search(data) {
    // console.log("search range", data);
    searchBtn.addEventListener("click", function () {
        const searchInput = document.getElementById("search-input");
        const searchValue = searchInput.value.trim().toUpperCase();
        const stations = data.stations;
        // console.log("search stations:", data);
        // Loop through all stations and find the one that matches the search input
        let matchFound = false;

        stations.forEach((station) => {
            const stationName = station.name;
            const stationNumber = station.number;
            const availableBikes = station.availableBikes;
            const availableBikeStands = station.availableBikeStands;
            let center = {
                lng: Number(station.positionLng),
                lat: Number(station.positionLat),
            };

            if (stationName == searchValue) {
                // Found a match, set the marker as the center of the map and display station information
                map.setCenter(center);
                map.setZoom(17);

                // console.log("center:", station.positionLat, station.positionLng);
                document.getElementById("info-box").innerHTML =
                    "<br><h6>" +
                    stationName +
                    "</h6>Station Number: " +
                    stationNumber +
                    "</div>" +
                    "</div><div>Available Bikes: " +
                    availableBikes +
                    "</div><div>Available Bike Stands: " +
                    availableBikeStands + "</div><br><div class='d-flex justify-content-between align-items-center'>" +
                    "<button id='toggle1' class='btn btn-primary flex-fill me-1' type='button' data-bs-toggle='offcanvas' data-bs-target='#offcanvasScrolling' aria-controls='offcanvasScrolling'>Information Charts</button>" +
                    "<button id='toggle2' class='btn btn-primary flex-fill ms-1' type='button' data-bs-toggle='offcanvas' data-bs-target='#offcanvasWithBackdrop' aria-controls='offcanvasWithBackdrop'>Plan a Ride</button>" + "</div>";
                matchFound = true;
                displayFiveNearestStations(stations, station);
                if (stationName == searchValue) {
                    displayHistoryHourly(stationNumber);
                    dispalyPredictChart(stationNumber);
                }
                return true;
            }
        });
        // If no match was found, clear the info box
        if (!matchFound) {
            document.getElementById("info-box").innerHTML =
                "<p>There is no such station, please try again</p>";
        }
    });
}

// ------------------------------------------------------------add a heatmap to Google Map--------------------------------
function addHeatmap(stations) {
    // Create an array to store the heatmap data points
    var heatmapData = [];
    // Iterate through the stations and add their location and available bikes as data points
    stations.forEach((station) => {
        var location = new google.maps.LatLng(Number(station.positionLat), Number(station.positionLng));
        var weight = parseInt(station.availableBikes, 10);

        // Add the data point to the heatmapData array
        heatmapData.push({location: location, weight: weight});
    });
    // Create the heatmap
    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        radius: 50,
        opacity: 0.6,
        gradient: [
            "rgba(255, 255, 255, 0)",
            "rgba(173, 216, 230, 1)",
            "rgba(135, 206, 235, 1)",
            "rgba(135, 206, 250, 1)",
            "rgba(100, 149, 237, 1)",
            "rgba(70, 130, 180, 1)",
            "rgba(65, 105, 225, 1)",
            "rgba(0, 0, 255, 1)",
            "rgba(0, 0, 205, 1)",
            "rgba(0, 0, 139, 1)",
            "rgba(0, 0, 128, 1)",
            "rgba(25, 25, 112, 1)",
            "rgba(0, 0, 90, 1)",
            "rgba(0, 0, 60, 1)"
        ]
    });
    // Add event listener to the toggle button
    document.getElementById("toggle-heatmap").addEventListener("click", function () {
        if (heatmap.getMap() == null) {
            // Show the heatmap layer
            heatmap.setMap(map);
        } else {
            // Hide the heatmap layer
            heatmap.setMap(null);
        }
    });
}

//-------------------------------------------------------------function display charts-----------------------------------------
// function display history chart
function displayHistoryHourly(stationNumber) {
    // Load Google Charts library
    google.charts.load("current", {packages: ["corechart"]});

    // Callback function for when Google Charts library is loaded
    google.charts.setOnLoadCallback(() => {
        let element = document.getElementsByClassName("clicked-station")[0];
        // let value = element.getAttribute("stationnumber");
        let value = stationNumber;
        const today_date = new Date().getDay();
        let data_date = 0;
        // trans the get data correspond with the history date data
        switch (today_date) {
            case 0:
                data_date = 6;
                break;
            case 1:
                data_date = 0;
                break;
            case 2:
                data_date = 1;
                break;
            case 3:
                data_date = 2;
                break;
            case 4:
                data_date = 3;
                break;
            case 5:
                data_date = 4;
                break;
            case 6:
                data_date = 5;
        }
        // const show_today = new Date().getUTCDay();
        fetch("/history/" + value + "/" + data_date)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // Extract available bike stands data from the response
                var history_weekly = data.history_weekly
                // console.log(history_weekly.length);
                // Create a data table for the chart
                var dataTable = new google.visualization.DataTable();
                dataTable.addColumn("string", "Hour");
                dataTable.addColumn("number", "Available Stands");
                dataTable.addColumn("number", "Available Bikes");
                // Add data to the data table
                for (var i = 0; i < history_weekly.length; i++) {
                    dataTable.addRow([(history_weekly[i]['hour']).toString(), history_weekly[i]['available_bike_stands'], history_weekly[i]['available_bikes']]);
                }
                const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const dayOfWeek = daysOfWeek[today_date];

                // Define chart options
                var options = {
                    title: "Average Available Stands and Bikes of " + dayOfWeek,
                    curveType: "function",
                    legend: {position: "bottom"}
                };
                // Create and draw the chart
                var chart = new google.visualization.LineChart(document.getElementById("history"));
                chart.draw(dataTable, options);
            })
            .catch(error => console.error(error));
    });
}

//--------------------------------------------------function display predict chart ------------------------------------
function dispalyPredictChart(stationNumber) {
    google.charts.load("current", {packages: ["corechart"]});
    // Callback function for when Google Charts library is loaded
    google.charts.setOnLoadCallback(() => {
        let value = stationNumber;
        fetch("/predictEach/" + value)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // Extract available bike stands data from the response
                var predict = data.predict
                // Create a data table for the chart
                var dataTable = new google.visualization.DataTable();
                dataTable.addColumn("string", "Time");
                dataTable.addColumn("number", "Predict Available Bikes");
                // Add data to the data table
                for (var i = 0; i < predict.length; i++) {
                    var date = new Date(predict[i][0]);
                    var formattedDate = date.toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        timeZone: "UTC"
                    });
                    dataTable.addRow([{v: predict[i][0], f: formattedDate}, predict[i][1]]);
                }
                // Define chart options
                var options = {
                    title: "Predict Available Bikes of next five days",
                    curveType: "function",
                    legend: {position: "bottom"},
                    hAxis: {
                        format: "MMM d",
                        gridlines: {count: -1},
                        minorGridlines: {count: -1}
                    }
                };
                // Create and draw the chart
                var chart = new google.visualization.LineChart(document.getElementById("predict"));
                chart.draw(dataTable, options);
            })
            .catch(error => console.error(error));
    });
}

//--------------------------------------------------------function display FiveNearestStations------------------------------------
function displayFiveNearestStations(stations, targetStation) {
    const targetLat = targetStation.positionLat;
    const targetLng = targetStation.positionLng;
    //  const stations = data.stations;
    let nearestStations = [];

    // adding the getDistance function
    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth radius in km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const lat1Rad = toRad(lat1);
        const lat2Rad = toRad(lat2);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1Rad) *
            Math.cos(lat2Rad);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    }

    function toRad(Value) {
        return (Value * Math.PI) / 180;
    }

    // Find the five nearest stations to the target station
    stations.forEach((station) => {
        const lat = station.positionLat;
        const lng = station.positionLng;
        const distance = getDistance(targetLat, targetLng, lat, lng);

        if (nearestStations.length < 5) {
            nearestStations.push({station, distance});
            nearestStations.sort((a, b) => a.distance - b.distance);
        } else if (distance < nearestStations[4].distance) {
            nearestStations.pop();
            nearestStations.push({station, distance});
            nearestStations.sort((a, b) => a.distance - b.distance);
        }
    });
    let infoTable =
        '<br><h6>The Nearest Five Stations</h6><table class="table table-hover"><thead id="thead"><tr><th scope="col">Number</th><th scope="col">Station</th><th scope="col">Bikes</th><th scope="col">Stands</th></tr></thead><tbody>';
    // Display information of the five nearest stations on a table
    nearestStations.forEach(({station}) => {
        const stationName = station.name;
        const stationNumber = station.number;
        const availableBikes = station.availableBikes;
        const availableBikeStands = station.availableBikeStands;
        infoTable +=
            '<tr><th scope="row">' +
            stationNumber +
            "</th><td>" +
            stationName +
            "</td><td>" +
            availableBikes +
            "</td><td>" +
            availableBikeStands +
            "</td></tr>";
    });
    infoTable += "</tbody></table>";
    // Update the table with the information
    document.getElementById("info-table").innerHTML = infoTable;
}

// -----------------------------------------function display real time weather data--------------------------------------------
function DisplayWeather(Weatherdata) {
    const weather = Weatherdata.weather;
    const temperature = Math.round(weather.main.temp - 273.15);
    const main = weather.weather[0].main;

    function getImageUrl(weatherType) {
        if (main === "Thunderstorm") {
            return "https://openweathermap.org/img/wn/11d@2x.png";
        } else if (main === "Drizzle") {
            return "https://openweathermap.org/img/wn/09d@2x.png";
        } else if (main === "Rain") {
            return "https://openweathermap.org/img/wn/10d@2x.png";
        } else if (main === "Snow") {
            return "https://openweathermap.org/img/wn/13d@2x.png";
        } else if (main === "Clear") {
            return "https://openweathermap.org/img/wn/01d@2x.png";
        } else if (main === "Clouds") {
            return "https://openweathermap.org/img/wn/02d@2x.png";
        } else {
            return "https://openweathermap.org/img/wn/50d@2x.png";
        }
    }

    const weatherDiv = document.getElementById("weather-box");
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(undefined, {
        weekday: "short"
    });
    weatherDiv.innerHTML = `<img src="${getImageUrl(
        main
    )}" alt="${main}"> ${formattedDate}: ${main}, ${temperature}°C`;
}

// ----------------------------------------------------------Display Weather Forecast -----------------------------------------
function DisplayWeatherForecast(WeatherForecastData) {
    // console.log(Weatherdata);
    const forecast = WeatherForecastData.forecast;
    for (let i = 0; i < forecast.length; i++) {
        const temperature = Math.round(forecast[i][2] - 273.15);
        const main = forecast[i][1];
        const time = forecast[i][0];
        const date = new Date(time).toLocaleDateString(undefined, {
            weekday: "short"
        });
        // add image to weather display:
        // for main: https://openweathermap.org/weather-conditions
        function getImageUrl(weatherType) {
            if (main === "Thunderstorm") {
                return "https://openweathermap.org/img/wn/11d@2x.png";
            } else if (main === "Drizzle") {
                return "https://openweathermap.org/img/wn/09d@2x.png";
            } else if (main === "Rain") {
                return "https://openweathermap.org/img/wn/10d@2x.png";
            } else if (main === "Snow") {
                return "https://openweathermap.org/img/wn/13d@2x.png";
            } else if (main === "Clear") {
                return "https://openweathermap.org/img/wn/01d@2x.png";
            } else if (main === "Clouds") {
                return "https://openweathermap.org/img/wn/02d@2x.png";
            } else {
                return "https://openweathermap.org/img/wn/50d@2x.png";
            }
        }

        // Display weather data
        const weatherDiv = document.getElementById("weather-predict");
        const icon = `<img src="${getImageUrl(main)}" alt="${main}" style="grid-row: 1; grid-column: 1; align-self: flex-start;width: 50px; height: 50px">`;
        const weatherData = `<div style="grid-row: 2; grid-column: 1;font-size: 10px;text-align: center;">${main}</div><div style="grid-row: 3; grid-column: 1;font-size: 10px;text-align: center;">${temperature}°C</div>`;
        const dateDiv = document.createElement("div");
        dateDiv.style.position = "absolute";
        dateDiv.style.top = "-20px";
        dateDiv.style.left = "55%";
        dateDiv.style.transform = "translateX(-50%)";
        dateDiv.innerText = date;
        weatherDiv.innerHTML += `<div style="display: grid; gap: 10px; align-items: center; position: relative;">${icon}${weatherData}</div>`;
        weatherDiv.lastChild.addEventListener("mouseenter", function () {
            dateDiv.style.display = "block";
        });
        weatherDiv.lastChild.appendChild(dateDiv);
    }
}

// -----------------------------------DropDown Function to display predict bikes ------------------------------------------
const predictBtn = document.getElementById("predict-tools-btn");

function AddingDropDown(data) {
    const stations = data.stations;

    function findStationNumberByName(name) {
        const station = stations.find(
            (station) => station.name === name.toUpperCase()
        );
        return station ? station.number : null;
    }

    let stationNames = "<option value='default'>Select station</option>";
    let datesArray = [];
    let timesArray = [];
    const numberBikeStandsDict = {};
    const nameNumberDict = {};
    let dates = "<option value='default'>Select date</option>";
    let times = "<option value='default'>Select time</option>";
    // Populate dropdown options with data from toolsData
    stations.forEach((station) => {
        stationNames +=
            "<option value='" + station.name + "'>" + station.name + "</option>";
        // Add station's number and bikeStands to numberBikeStandsDict
        numberBikeStandsDict[station.number] = station.bikeStands;
        nameNumberDict[station.name] = station.number;
    });
    // fetch the predict data
    fetch("/ToolsEach/" + 1)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let predict = data.value;
            for (const date in predict) {
                datesArray.push(date);
                for (const time in predict[date]) {
                    if (!times.includes(time)) {
                        timesArray.push(time);
                    }
                }
            }
            datesArray.forEach((date) => {
                dates += "<option value='" + date + "'>" + date + "</option>";
            });
            timesArray.forEach((time) => {
                times += "<option value='" + time + "'>" + time + "</option>";
            });

            document.getElementById("start").innerHTML = stationNames;
            document.getElementById("dest").innerHTML = stationNames;
            document.getElementById("date1").innerHTML = dates;
            document.getElementById("time1").innerHTML = times;
            document.getElementById("date2").innerHTML = dates;
            document.getElementById("time2").innerHTML = times;
        })
        .catch((error) => console.error(error));

    predictBtn.addEventListener("click", function () {
        // Get user's selections from the dropdown menus
        const startStation = document.getElementById("start").value;
        const destStation = document.getElementById("dest").value;
        const date1 = document.getElementById("date1").value;
        const time1 = document.getElementById("time1").value;
        const date2 = document.getElementById("date2").value;
        const time2 = document.getElementById("time2").value;

        // Check if all options are selected, otherwise display an alert
        if (
            startStation === "default" ||
            destStation === "default" ||
            date1 === "default" ||
            time1 === "default" ||
            date2 === "default" ||
            time2 === "default"
        ) {
            alert("Please select all the options");
            return;
        }
        // Update the innerText of the HTML elements with the calculated values
        document.getElementById("start-time").innerText =
            "Start time at " + date1 + " " + time1 + ":";
        document.getElementById("dest-time").innerText =
            "Arrival time at " + date2 + " " + time2 + ":";

        let startNumber = nameNumberDict[startStation];
        // console.log("aaaaaaaaaa:",startNumber)
        let destNumber = nameNumberDict[destStation];
        //get the start station predict value
        fetch("/ToolsEach/" + startNumber)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let startPredict = data.value;
                const startAvailableBikes = startPredict[date1][time1];
                const startAvailableStands =
                    numberBikeStandsDict[startNumber] - startAvailableBikes;
                // Update the innerText of the HTML elements with the calculated values
                // Use Math.floor and Math.ceil function make Available bike number to integer
                document.getElementById(
                    "start-available-bikes"
                ).innerText = `Start Station Available Bikes: ${Math.floor(
                    startAvailableBikes
                )}~${Math.ceil(startAvailableBikes)}`;
                document.getElementById(
                    "start-available-stands"
                ).innerText = `Start Station Available Stands: ${Math.floor(
                    startAvailableStands
                )}~${Math.ceil(startAvailableStands)}`;
            })
            .catch((error) => console.error(error));

        //get the dest station predict value
        fetch("/ToolsEach/" + destNumber)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let destPredict = data.value;
                const destAvailableBikes = destPredict[date2][time2];
                const destAvailableStands =
                    numberBikeStandsDict[destNumber] - destAvailableBikes;
                // Update the innerText of the HTML elements with the calculated values
                // Use Math.floor and Math.ceil function make Available bike number to integer
                document.getElementById(
                    "destination-available-bikes"
                ).innerText = `Destination Station Available Bikes: ${Math.floor(
                    destAvailableBikes
                )}~${Math.ceil(destAvailableBikes)}`;
                document.getElementById(
                    "destination-available-stands"
                ).innerText = `Destination Station Available Stands: ${Math.floor(
                    destAvailableStands
                )}~${Math.ceil(destAvailableStands)}`;
            })
            .catch((error) => console.error(error));
    });
}

// -----------------------------------------------function best route journey--------------------------------------------
function bestRoute(data) {
    const stations = data.stations;
    let userMarker = null;
    let nearestStationMarker = null;
    let route = null;

    function displayRoute(userLocation, nearestStation) {
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);

        const start = userLocation;
        const end = new google.maps.LatLng(
            Number(nearestStation.positionLat),
            Number(nearestStation.positionLng)
        );

        const request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.WALKING,
        };
        directionsService.route(request, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                if (route) {
                    route.setMap(null);
                }
                directionsRenderer.setDirections(result);
                route = directionsRenderer;
                // Get the distance and estimated arrival time from the response
                const distance = result.routes[0].legs[0].distance.text;
                const duration = result.routes[0].legs[0].duration.text;
                // Create the content string for the info window
                const contentString = `
        <div>
          <p><strong>Distance:</strong> ${distance}</p>
          <p><strong>Estimated arrival time:</strong> ${duration}</p>
        </div>
      `;
                // Create and open the info window with the content string
                const infoWindow = new google.maps.InfoWindow({
                    content: contentString,
                });
                infoWindow.open(map, nearestStationMarker);
            } else {
                console.error("Error getting directions: ", status);
            }
        });
    }

    function addMarker(location, title) {
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            title: title,
        });

        const infoWindow = new google.maps.InfoWindow({
            content: title,
        });

        // Open the info window automatically without waiting for a click event
        infoWindow.open(map, marker);

        return marker;
    }

    const routeBtn = document.getElementById("best-route");
    routeBtn.addEventListener("click", function () {
        if (userMarker) {
            userMarker.setMap(null);
            userMarker = null;
        }
        if (nearestStationMarker) {
            nearestStationMarker.setMap(null);
            nearestStationMarker = null;
        }
        if (route) {
            route.setMap(null);
            route = null;
        }
        // Allow the user to select a location on the map
        const clickListener = map.addListener("click", (event) => {
            if (userMarker) {
                userMarker.setMap(null);
                userMarker = null;
            }
            if (nearestStationMarker) {
                nearestStationMarker.setMap(null);
                nearestStationMarker = null;
            }
            if (route) {
                route.setMap(null);
                route = null;
            }
            const userLocation = event.latLng;
            userMarker = addMarker(userLocation, "Your location");
            findNearestStation(userLocation);
        });
    });

    // function to find the nearest station
    function findNearestStation(userLocation) {
        let minDistance = Infinity;
        let nearestStation = null;
        stations.forEach((station) => {
            const stationLocation = {
                lat: Number(station.positionLat),
                lng: Number(station.positionLng),
            };
            const distance = google.maps.geometry.spherical.computeDistanceBetween(
                userLocation,
                new google.maps.LatLng(stationLocation)
            );

            if (distance < minDistance) {
                minDistance = distance;
                nearestStation = station;
            }
        });
        if (nearestStation) {
            nearestStationMarker = addMarker(
                new google.maps.LatLng(
                    Number(nearestStation.positionLat),
                    Number(nearestStation.positionLng)
                ),
                "Nearest station"
            );
            displayRoute(userLocation, nearestStation);
        }
    }
}

//-----------------------------------------------------------get stations data function---------------------------------------
function getStations() {
    fetch("/stations")
        .then((response) => response.json())
        .then((data) => {
            // console.log("fetch response", data);
            addMarkers(data);
            search(data);
            addHeatmap(data.stations);
            AddingDropDown(data);
            bestRoute(data);
        })
        .catch((error) => {
            console.error("fetch error", error);
        });
}

//------------------------------------------------------get weather data function-------------------------------------
function getWeather() {
    fetch("/weather")
        .then((response) => response.json())
        .then((data) => {
            // console.log("fetch response", data);
            DisplayWeather(data);
        });
}

//-------------------------------------------------get forecast weather function-------------------------------------
function getForecastWeather() {
    fetch("/weatherForecast")
        .then((response) => response.json())
        .then((data) => {
            // console.log("fetch response", data);
            DisplayWeatherForecast(data);
        });
}

//---------------------------------------------------------------------init map-----------------------------------------------------------
function initMap() {
    const dublin = {lat: 53.35014, lng: -6.266155};
    // The map, centered at Dublin
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: dublin,
        styles: [
            {
                featureType: "all",
                stylers: [
                    {
                        saturation: 0,
                    },
                    {
                        hue: "#e3f2fd",
                    },
                ],
            },
            {
                featureType: "road",
                stylers: [
                    {
                        saturation: -70,
                    },
                ],
            },

            {
                featureType: "transit",
                stylers: [
                    {
                        visibility: "off",
                    },
                ],
            },

            {
                featureType: "poi",
                stylers: [
                    {
                        visibility: "off",
                    },
                ],
            },
            {
                featureType: "water",
                stylers: [
                    {
                        visibility: "simplified",
                    },
                    {
                        saturation: -60,
                    },
                ],
            },
        ],
    });
    // add the get data function
    getStations();
    getWeather();
    getForecastWeather();
}

var map = null;
window.initMap = initMap;