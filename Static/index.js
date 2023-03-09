function addMarkers(data){
    console.log(data)
    const stations = data.station;
    // console.log(stations.station)
    stations.forEach(station =>{
        var marker = new google.maps.Marker({
            position:{
                lat:Number(station.positionLat),
                // lat:53.34833,
                // lng: -6.26673,
                lng:Number(station.positionLng),
            },
            map:map,
            title:station.name,
            station_number:station.number,
        });
    });
}

// }
function getStations() {
    fetch("/stations")
        .then((response) => response.json())
        .then((data) => {
            console.log("fetch response", data);
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


// fetch("http://127.0.0.1:5000/stations")
// .then((response) => response.json())
// .then((data) => console.log(data));



