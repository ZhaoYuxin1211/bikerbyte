let map;

function initMap() {
  const myLatLng = { lat: 53.34597, lng: -6.25546 },
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 20,
      center: myLatLng,
    });
  const pinViewBackground = new google.maps.marker.PinView({
    background: "#FBBC04",
  });
  const markerViewBackground = new google.maps.marker.AdvancedMarkerView({
    map,
    position: { lat: 53.34597, lng: -6.25546 },
    content: pinViewBackground.element,
  });
  //   const markerView = new google.maps.Marker({
  //     map,
  //     position: myLatLng,
  //     title: "Hello biker!",
  // content: pinViewBackground.element,
  //   });
}

// const pinViewBackground = new google.maps.marker.PinView({
//   background: "#FBBC04",
// });
// const markerViewBackground = new google.maps.marker.AdvancedMarkerView({
//   map,
//   position: { lat: 37.419, lng: -122.01 },
//   content: pinViewBackground.element,
// });

window.initMap = initMap;
