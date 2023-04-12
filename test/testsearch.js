// global variable to hold the current marker
let currentMarker = null;

// geocode an address and set a marker at the geocoded location
function geocodeAddress(address) {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address }, (results, status) => {
    if (status === "OK") {
      const location = results[0].geometry.location;
      if (currentMarker) {
        currentMarker.setMap(null);
      }
      currentMarker = new google.maps.Marker({
        position: location,
        map: map,
      });
      map.setCenter(location);
      map.setZoom(17);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

// add an event listener to the search button to geocode the address entered
document.getElementById("search-button").addEventListener("click", () => {
  const address = document.getElementById("search-input").value;
  geocodeAddress(address);
});

// add an event listener to the close button to hide the info-box
document.getElementById("close").addEventListener("click", () => {
  document.getElementsByClassName("info-box")[0].style.display = "none";
});

// add an event listener to each marker to show station information in the info-box
function addMarkers(data) {
  const stations = data.stations;
  stations.forEach((station) => {
    var markerIcon = "";
    if (station.availableBikes >= 0 && station.availableBikes <= 5) {
      markerIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "red",
        fillOpacity: 0.8,
        strokeColor: "white",
        strokeWeight: 1,
        scale: 12,
      };
    } else if (station.availableBikes > 5 && station.availableBikes <= 10) {
      markerIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "orange",
        fillOpacity: 0.8,
        strokeColor: "white",
        strokeWeight: 1,
        scale: 12,
      };
    } else {
      markerIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "green",
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
      label: {
        text: station.availableBikes.toString(),
        color: "#ffffff",
        fontSize: "10px",
        fontWeight: "bold",
      },
    });
    marker.addListener("click", function () {
      const stationName = station.name;
      const stationNumber = station.number;
      const availableBikes = station.availableBikes;
      const availableBikeStands = station.availableBikeStands;
      // display the station info
      var infoBox = document.getElementsByClassName("info-box")[0];
      infoBox.innerHTML =
          '<div>' +
          stationName +
          '<div>Station Number: ' +
          stationNumber +
          "</div>" +
          "</div><div>Available Bikes: " +
          availableBikes +
          '</div><div>Available Bike Stands: ' +
          availableBikeStands +
          "</div>";

      // show the info box
      infoBox.style.display = "block";

      // add a click listener to the close button to hide the info box
      var closeButton = document.getElementsByClassName("close")[0];
      closeButton.addEventListener("click", function () {
        infoBox.style.display = "none";
      });
    });
  });
}