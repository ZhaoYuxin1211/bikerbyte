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
        '<div id="content"><h5>' +
        "No." +
        station.number +
        " " +
        station.name +
        " " +
        '<span class="badge rounded-pill text-bg-primary">' +
        station.status +
        "</span>" +
        "</h5></div>" +
        '<div id="station_availability"><h6>' +
        "Avilabilable Bikes:" +
        station.availableBikes +
        "</h6></div>" +
        '<div id="station_availability"><h6>' +
        "Avilabilable Stands:" +
        station.availableBikeStands +
        "</h6></div>",
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

      // Retrieve information for station
      var stationName = this.getTitle();
      var stationNumber = station.number;
      var availableBikes = station.availableBikes;
      var availableBikeStands = station.availableBikeStands;

      // display the station info
      document.getElementById("info-box").innerHTML =
        '<br><h6>' +
        stationName +
        "</h6><div>Station Number: " +
        stationNumber +
        "</div>" +
        "</div><div>Available Bikes: " +
        availableBikes +
        "</div><div>Available Bike Stands: " +
        availableBikeStands +
        "</div>" +
        '<button id="toggle" class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">History and Predict</button>';

      const targetStation = station;
      displayFiveNearestStations(stations, targetStation);
      // // call getWeather() function and pass in station position coordinates
      //  getWeather(station.positionLat,station.positionLng));
    });
  });
}

// adding search functions:
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
      const center = {
        lon: Number(station.positionLng),
        lat: Number(station.positionLat),
      };

      if (stationName == searchValue) {
        // Found a match, set the marker as the center of the map and display station information
        map.setZoom(17);
        map.setCenter(center);
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
          '<button id="toggle"  class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">History and Predict</button>';
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

//add info table
// function addinfotable(data) {
//   const stations = data.stations;
//   console.log("table:", stations);
//   var info_table = "";
//   stations.forEach((station) => {
//     const stationName = station.name;
//     const stationNumber = station.number;
//     const availableBikes = station.availableBikes;
//     const availableBikeStands = station.availableBikeStands;

//     info_table +=
//       '<tr><th scope="row">' +
//       stationNumber +
//       "</th><td>" +
//       stationName +
//       "</td><td>" +
//       availableBikes +
//       "</td><td>" +
//       availableBikeStands +
//       "</td></tr>";
//   });
//   document.getElementById("info-table").innerHTML = info_table;
// }

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
// display weather data

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

function getStations() {
  fetch("/stations")
    .then((response) => response.json())
    .then((data) => {
      console.log("fetch response", data);
      addMarkers(data);
      search(data);
      // addinfotable(data);
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

// function getWeather(lat, lng) {
//   fetch(`/weather?lat=${lat}&lng=${lng}`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("fetch response", data);
//       DisplayWeather(data);
//     });
// }

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
}

var map = null;
window.initMap = initMap;
