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
//        //other pop up
//        var jqxhr = $.getJSON($SCRIPT_ROOT + "/occupancy/" + marker.station_number, function(data) {
//            data = JSON.parse(data.data);
//            console.log('data', data);
//
//            var node = document.createElement('div');
//            var infowindow2 = new google.maps.InfoWindow();
//            var chart = new google.visualization.ColumnChart(node);
//            var chart_data = new google.visualization.DataTable();
//
//
//            chart_data.addColumn('datetime', 'Time of Day');
//            chart_data.addColumn('number', '#');
//
//             _.forEach(data, function(row) {
//             chart_data.addRow([new Date(row[0]), row[1]]);
//             });
//
//            chart.draw(chart_data, options);
//
//            infowindow2.setContent(node);
//            infowindow2.open(map, marker);
//        }).fail(function() {
//            console.log("error");
//        });

    });
}

//other pop up

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





