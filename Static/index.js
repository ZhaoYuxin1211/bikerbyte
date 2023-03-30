//function addMarkers(data){
//    console.log(data)
//    const stations = data.stations;
//    // console.log("---------------")
//    // console.log(stations)
//    // for (var i = 0; i < stations.length; i++) {
//    //     var marker = new google.maps.Marker({
//    //         position:{
//    //             lat:Number(stations[i].positionLat),
//    //             lng:Number(stations[i].positionLng),
//    //         },
//    //         map:map,
//    //         title:stations[i].name,
//    //         station_number:stations[i].number,
//    //     });
//    // }
//    stations.forEach(station =>{
//        var marker = new google.maps.Marker({
//            position:{
//                lat:Number(station.positionLat),
//                lng:Number(station.positionLng),
//            },
//            map:map,
//            title:station.name,
//            station_number:station.number,
//        });
//        contentString = '<div id="content"><h1>' + station.name + '</h1></div>' + '<div id="station_availability"></div>';
//        google.maps.event.addListener(marker, 'click', function() {
//        drawInfoWindowChart(this);
//        });
////        const contentString =
////        '<div id="content"><h1>' + station.name + '</h1></div>' +
////        '<div id="station_availability"></div>';
////        const infowindow = new google.maps.InfoWindow({
////        content: contentString,
////        });
////
////        // Attach the InfoWindow to the marker
////        marker.addListener('click', function () {
////        infowindow.open(map, marker);
////
////        });
//     }
//}
function addMarkers(data) {
    console.log(data);
    const stations = data.stations;

    stations.forEach(station => {
        var marker = new google.maps.Marker({
            position: {
                lat: Number(station.positionLat),
                lng: Number(station.positionLng),
            },
            map: map,
            title: station.name,
            station_number: station.number,
        });

        // creates markers with info box with information
        var infoWindow = new google.maps.InfoWindow({
            content:
                '<div id="content"><h4>' + station.name + '</h4></div>'
                + '<div id="station_status"><h6>'+'Station Status:'+station.status+'</h6></div>'
                + '<div id="station_availability"><h6>'+'Avilabilable Bikes:'+ station.availableBikes+'</h6></div>'
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

 // Create an InfoWindow with custom content

//  }
//}
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





