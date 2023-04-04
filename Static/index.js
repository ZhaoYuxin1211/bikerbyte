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
        "<div>" +
        stationName +
        "<div>Station Number: " +
        stationNumber +
        "</div>" +
        "</div><div>Available Bikes: " +
        availableBikes +
        "</div><div>Available Bike Stands: " +
        availableBikeStands +
        "</div>";

      // // call getWeather() function and pass in station position coordinates
      //  getWeather(station.positionLat,station.positionLng));
    });
  });
}
// adding search functions:
const searchBtn = document.getElementById("search-btn");

function search(data) {
  console.log("search range",data);
  searchBtn.addEventListener("click", function () {
    const searchInput = document.getElementById("search-input");
    const searchValue = searchInput.value.trim().toUpperCase();
    const stations = data.stations;
    // Loop through all stations and find the one that matches the search input
    let matchFound = false;

    data.stations.forEach((station) => {
      const stationName = station.name;
      const stationNumber = station.number;
      const availableBikes = station.availableBikes;
      const availableBikeStands = station.availableBikeStands;

      if (stationName == searchValue) {
        // Found a match, set the marker as the center of the map and display station information
        map.setZoom(17);
        map.setCenter(station.positionLat, station.positionLng);
        document.getElementById("info-box").innerHTML =
          "<div>" +
          stationName +
          "<div>Station Number: " +
          stationNumber +
          "</div>" +
          "</div><div>Available Bikes: " +
          availableBikes +
          "</div><div>Available Bike Stands: " +
          availableBikeStands +
          "</div>";
        matchFound = true;
        console.log(station.name);
      }
    });

    // If no match was found, clear the info box
    if (!matchFound) {
      document.getElementById("info-box").innerHTML =
        "<p>There is no such station, please try again</p>";
    }
  });
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
