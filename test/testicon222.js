function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.4239163, lng: -122.0947209 },
    zoom: 17,
    mapId: "DEMO_MAP_ID",
  });

  const markerView = new google.maps.marker.AdvancedMarkerView({
    map,
    position: { lat: 37.4239163, lng: -122.0947209 },
  });

  markerView.addListener("click", ({ domEvent, latLng }) => {
    const { target } = domEvent;
    // Handle the click event.
    // ...
  });
}
