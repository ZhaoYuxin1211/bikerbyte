let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 53.350140, lng: -6.266155 },
    zoom: 12,
  });
}

window.initMap = initMap;
