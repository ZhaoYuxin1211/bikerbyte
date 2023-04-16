function addMarkers(data) {
  // console.log(data);
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
    'No.' +
    station.number +
    ' ' +
    station.name +
    ' ' +
    '<span id="status" class="badge badge-primary">' +
    'Now: ' +
    station.status +
    '</span>' +
    '</h6></div>' +
    '<div id="station_availability"><h6>' +
    'Available Bikes: ' +
    station.availableBikes +
    '</h6></div>' +
    '<div id="station_availability"><h6>' +
    'Available Stands: ' +
    station.availableBikeStands +
    '</h6></div>',
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
      document.getElementById("show_date").innerHTML="Today: "+dayOfWeek;

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
        "</div><div class='d-flex justify-content-between align-items-center'>" +
        "<button id='toggle1' class='btn btn-primary col-5' type='button' data-bs-toggle='offcanvas' data-bs-target='#offcanvasScrolling' aria-controls='offcanvasScrolling'>Information Charts</button>" +
        "<button id='toggle2' class='btn btn-primary' type='button' data-bs-toggle='offcanvas' data-bs-target='#offcanvasWithBackdrop' aria-controls='offcanvasWithBackdrop'>Plan a Ride</button></div>";

      const targetStation = station;
      displayFiveNearestStations(stations, targetStation);

      displayHistoryHourly();
      dispalyPredictChart();


      // // call getWeather() function and pass in station position coordinates
      //  getWeather(station.positionLat,station.positionLng));
    });
  });
}

//----------------------------------------------------- adding search functions-----------------------------------------
const searchBtn = document.getElementById("search-btn");
function search(data) {
  console.log("search range", data);
  searchBtn.addEventListener("click", function () {
    const searchInput = document.getElementById("search-input");
    const searchValue = searchInput.value.trim().toUpperCase();
    const stations = data.stations;
    console.log("search stations:", data);
    // Loop through all stations and find the one that matches the search input
    let matchFound = false;

    stations.forEach((station) => {
      const stationName = station.name;
      const stationNumber = station.number;
      const availableBikes = station.availableBikes;
      const availableBikeStands = station.availableBikeStands;
      let center = {
        lon: Number(station.positionLng),
        lat: Number(station.positionLat),
      };

      if (stationName == searchValue) {
        // Found a match, set the marker as the center of the map and display station information
        map.setCenter(center);
        map.setZoom(17);

        console.log("center:", station.positionLat, station.positionLng);
        document.getElementById("info-box").innerHTML =
          "<br><h6>" +
          stationName +
          "</h6>Station Number: " +
          stationNumber +
          "</div>" +
          "</div><div>Available Bikes: " +
          availableBikes +
          "</div><div>Available Bike Stands: " +
          availableBikeStands +
          "</div>" +
          '<div class="d-flex justify-content-between align-items-center">' +
          '<button id="toggle1" class="btn btn-primary col-5" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Information Charts</button>' +
          '<button id="toggle2" class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">Plan a Ride</button></div>';
        matchFound = true;
        console.log(station.name);
        const targetStation = station;
        displayFiveNearestStations(stations, targetStation);
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
//-------------------------------------------------------------function display-----------------------------------------
// function display
function displayHistoryHourly() {
  // Load Google Charts library
  google.charts.load("current", { packages: ["corechart"] });

  // Callback function for when Google Charts library is loaded
  google.charts.setOnLoadCallback(() => {
    let element = document.getElementsByClassName("clicked-station")[0];
    let value = element.getAttribute("stationnumber");
    // console.log("ttttttttttt" + value);
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
          dataTable.addRow([(history_weekly[i]['hour']).toString(), history_weekly[i]['available_bike_stands'],history_weekly[i]['available_bikes']]);
        }

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = daysOfWeek[today_date];

        // Define chart options
        var options = {
          title: "Average Available Stands and Bikes of "+dayOfWeek,
          curveType: "function",
          legend: { position: "bottom" }
        };
        // Create and draw the chart
        var chart = new google.visualization.LineChart(document.getElementById("history"));
        chart.draw(dataTable, options);
      })
      .catch(error => console.error(error));
  });
}
//--------------------------------------------------------displaypredictdata------------------------------------

function dispalyPredictChart(){
  google.charts.load("current", { packages: ["corechart"] });
  // Callback function for when Google Charts library is loaded
  google.charts.setOnLoadCallback(() => {
    let element = document.getElementsByClassName("clicked-station")[0];
    let value = element.getAttribute("stationnumber");
    // console.log("ttttttttttt" + value);
    fetch("/predictEach/"+value)
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
          dataTable.addRow([(predict[i][0]).toString(),predict[i][1]]);
        }

        // Define chart options
        var options = {
          title: "Predict Available Bikes of next five days",
          curveType: "function",
          legend: { position: "bottom" }
        };

        // Create and draw the chart
        var chart = new google.visualization.LineChart(document.getElementById("predict"));
        chart.draw(dataTable, options);
      })
      .catch(error => console.error(error));
  });

}

//--------------------------------------------------------displayFiveNearestStations------------------------------------
function displayFiveNearestStations(stations, targetStation) {
  const targetLat = targetStation.lat;
  const targetLng = targetStation.lng;
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
    const lat = station.lat;
    const lng = station.lng;
    const distance = getDistance(targetLat, targetLng, lat, lng);

    if (nearestStations.length < 5) {
      nearestStations.push({ station, distance });
      nearestStations.sort((a, b) => a.distance - b.distance);
    } else if (distance < nearestStations[4].distance) {
      nearestStations.pop();
      nearestStations.push({ station, distance });
      nearestStations.sort((a, b) => a.distance - b.distance);
    }
  });

  let infoTable =
    '<br><h6>The Nearest Five Station</h6><table class="table table-hover"><thead id="thead"><tr><th scope="col">Number</th><th scope="col">Station</th><th scope="col">Bikes</th><th scope="col">Stands</th></tr></thead><tbody>';
  // Display information of the five nearest stations on a table
  nearestStations.forEach(({ station }) => {
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

// -----------------------------------------------------display weather data--------------------------------------------
function DisplayWeather(Weatherdata) {
  console.log(Weatherdata);
  const weather = Weatherdata.weather;
  const temperature = Math.round(weather.main.temp - 273.15);
  const main = weather.weather[0].main;
  const description = weather.weather[0].description;

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
  const weatherDiv = document.getElementById("weather-box");
  // weatherDiv.innerHTML = `${main}, ${description}, ${temperature}°C`;
  weatherDiv.innerHTML = `<img src="${getImageUrl(
    main
  )}" alt="${main}"> ${main}, ${temperature}°C`;
  //  weatherDiv.innerHTML =  '<div>' + main+ '<div>temperature: '+ temperature + '</div>';
}
// ----------------------------------------------------------DropDown Function------------------------------------------
let stationsDataReady = false;
let toolsDataReady = false;
let stationsData = null;
let toolsData = null;
// Process data and call AddingDropDown if both stationsData and toolsData are ready
function processData() {
  if (stationsDataReady && toolsDataReady) {
    AddingDropDown(stationsData, toolsData);
  }
}

// Add options for stations, dates, and times to dropdown menus
const predictBtn = document.getElementById("predict-tools-btn");
function AddingDropDown(stationsData, toolsData) {
  let stationNames = "<option value='default'>Select station</option>";
  let dates = "<option value='default'>Select date</option>";
  let times = "<option value='default'>Select time</option>";
  // Create sets to store unique dates and times
  const uniqueDates = new Set();
  const uniqueTimes = new Set();
  // Populate dropdown options with data from toolsData
  for (const stationName in toolsData.value) {
    const stationData = toolsData.value[stationName];
    stationNames +=
      "<option value='" + stationName + "'>" + stationName + "</option>";

    for (const date in stationData) {
      if (!uniqueDates.has(date)) {
        uniqueDates.add(date);
        dates += "<option value='" + date + "'>" + date + "</option>";
      }
      const dateData = stationData[date];

      for (const time in dateData) {
        if (!uniqueTimes.has(time)) {
          uniqueTimes.add(time);
          times += "<option value='" + time + "'>" + time + "</option>";
        }
      }
    }
  }

  document.getElementById("start").innerHTML = stationNames;
  document.getElementById("dest").innerHTML = stationNames;
  document.getElementById("date1").innerHTML = dates;
  document.getElementById("time1").innerHTML = times;
  document.getElementById("date2").innerHTML = dates;
  document.getElementById("time2").innerHTML = times;

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
    // Create a map of station names to their respective number of bike stands
    const stationBikeStandsMap = {};
    for (let i = 0; i < stationsData.stations.length; i++) {
      const station = stationsData.stations[i];
      stationBikeStandsMap[station.name] = station.bikeStands;
    }
    console.log("stationBikeStandsMap", stationBikeStandsMap);
    console.log("stationBikeStandsMap", stationBikeStandsMap);

    const startAvailableBikes = toolsData.value[startStation][date1][time1];
    const destAvailableBikes = toolsData.value[destStation][date2][time2];
    // calculate available stands (stands-available bikes)
    const startAvailableStands =
      stationBikeStandsMap[startStation] - startAvailableBikes;
    const destAvailableStands =
      stationBikeStandsMap[destStation] - destAvailableBikes;

    // Update the innerText of the HTML elements with the calculated values
    // Use Math.floor and Math.ceil function make Available bike number to integer
    document.getElementById("start-time").innerText =
      "Start time at " + date1 + " " + time1 + ":";
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
    document.getElementById("dest-time").innerText =
      "Arrival time at " + date2 + " " + time2 + ":";
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
  });
}

//-------------------------------------------------------------get data functions---------------------------------------
function getStations() {
  fetch("/stations")
    .then((response) => response.json())
    .then((data) => {
      console.log("fetch response", data);
      addMarkers(data);
      search(data);
      // addinfotable(data);
      stationsData = data;
      stationsDataReady = true;
      processData();
    })
    .catch((error) => {
      console.error("fetch error", error);
    });
}

function getWeather() {
  fetch("/weather")
    .then((response) => response.json())
    .then((data) => {
      console.log("fetch response", data);
      DisplayWeather(data);
    });
}

function getToolsData() {
  fetch("/predicttools")
    .then((response) => response.json())
    .then((data) => {
      console.log("fetch predicttools response", data);
      toolsData = data;
      toolsDataReady = true;
      processData();
    });
}
//---------------------------------------------------------------------init map-----------------------------------------------------------
function initMap() {
  const dublin = { lat: 53.35014, lng: -6.266155 };
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

  getStations();
  getWeather();
  getToolsData();
}

var map = null;
window.initMap = initMap;
