let map = null;

function addMarkers(stations) {
  for (const station of stations) {
    const marker = new google.maps.Marker({
      position: {
        lat: station.position_lat,
        lng: station.position_lng,
      },
      map: map,
      title: station.name,
      station_number: station.number,
    });

    // Create an InfoWindow with custom content
    const contentString =
      '<div id="content"><h1>' + station.name + '</h1></div>' +
      '<div id="station_availability"></div>';
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    // Attach the InfoWindow to the marker
    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });
  }
}

function getStations() {
  fetch('/stations')
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log('fetch response', typeof data);
      addMarkers(data);
    });
}

function initMap() {
  const dublin = { lat: 53.35014, lng: -6.266155 };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: dublin,
  });
  getStations();
}

window.initMap = initMap;