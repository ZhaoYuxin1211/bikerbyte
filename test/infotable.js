getStations();
function addinfotable(data) {
  const stations = data.stations;
  var info_table = "";
  stations.forEach((station) => {
    var stationName = station.name;
    var stationNumber = station.number;
    var availableBikes = station.availableBikes;
    var availableBikeStands = station.availableBikeStands;

    info_table +=
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
  document.getElementById("info-table").innerHTML = info_table;
}

function getStations() {
  fetch("/stations")
    .then((response) => response.json())
    .then((data) => {
      console.log("fetch response", data);
      addinfotable(data);
    })
    .catch((error) => {
      console.error("fetch error", error);
    });
}
