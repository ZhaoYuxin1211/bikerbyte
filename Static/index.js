function addMarkers(data){
    console.log(data)
    const stations = data.stations;
    // console.log("---------------")
    // console.log(stations)
    // for (var i = 0; i < stations.length; i++) {
    //     var marker = new google.maps.Marker({
    //         position:{
    //             lat:Number(stations[i].positionLat),
    //             lng:Number(stations[i].positionLng),
    //         },
    //         map:map,
    //         title:stations[i].name,
    //         station_number:stations[i].number,
    //     });
    // }
    stations.forEach(station =>{
        var marker = new google.maps.Marker({
            position:{
                lat:Number(station.positionLat),
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





