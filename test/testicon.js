function addMarkers(data) {
    console.log(data);
    const stations = data.stations;

    stations.forEach(station => {
        var markerIcon = '';

        if (station.availableBikes >= 0 && station.availableBikes <= 5) {
            markerIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
        } else if (station.availableBikes > 5 && station.availableBikes <= 10) {
            markerIcon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
        } else {
            markerIcon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
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
        });

        // creates markers with info box with information
        var infoWindow = new google.maps.InfoWindow({
            content:
                '<div id="content"><h4>' + station.name + '</h4></div>'
                + '<div id="station_status"><h6>'+'Station Status:'+station.status+'</h6></div>'
                + '<div id="station_availability"><h6>'+'Available Bikes:'+ station.availableBikes+'</h6></div>'
        });

        // makes the info box if you click the box
        marker.addListener('click', function() {
            if (infoWindow.getMap() == null) {
                // infoWindow is not open
                infoWindow.open(map, marker);
            } else {
                // infoWindow is open, close it
                infoWindow.close();
            }
        });
    });
}
function getStations() {
    fetch("/stations")
        .then((response) => response.json())
        .then((data) => {
            console.log("fetch response",data);
            addMarkers(data);
        });
}

function initMap() {
    const dublin = {lat: 53.35014, lng: -6.266155};
// The map, centered at Dublin
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: dublin,
    });

    getStations();
}

var map = null;
window.initMap = initMap;