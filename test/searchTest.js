//Adding search function:
const searchBtn = document.getElementById("search-btn");

//
searchBtn.addEventListener("click", function () {
  const searchInput = document.getElementById("search-input");
  const searchValue = searchInput.value.trim().toUpperCase();
  // Loop through all stations and find the one that matches the search input
  let matchFound = false;
  stations.forEach((station) => {
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
      console.log(stationName);
    }
  });

  // If no match was found, clear the info box
  if (!matchFound) {
    document.getElementById("info-box").innerHTML =
      "<p>There is no such station,please try again</p>";
  }
});

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
