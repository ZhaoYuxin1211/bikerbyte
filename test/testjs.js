let map;

function initMap() {
  const myLatLng = { lat: 53.34597, lng: -6.25546 },
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 20,
      center: myLatLng,
    });
  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hello biker!",
  });
}

window.initMap = initMap;
