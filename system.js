var map
var street = undefined
var startingPos = {lat: 47.4474629, lng: -0.5421491}

// Initial map with custom pos
function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: startingPos,
    zoom: 8,
    disableDefaultUI: true,
    // Satellite view with labels of town and such
    mapTypeId: 'hybrid',
    styles: [
      // Hide roads because that's real ugly
      {
        featureType: "road",
        stylers: [
          {visibility: "off"}
        ]
      },
      // Hide places because it takes visibility away
      {
        featureType: 'poi',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'transit',
        elementType: 'labels.icon',
        stylers: [{visibility: 'off'}]
      }
    ]
  })
};

// Each second check mapState Function
var t=setInterval(mapState,1000);

// Check zoom level and call appropriate map
function mapState(){
  //Are we zoomed enough that you can see individual house ?
  if(map.zoom > 19){
    // set the type to satellite so that you don't get the infos and label
    // while zoomed
    map.mapTypeId = "satellite"

    if(!street){
      enableStreetView();
    }
  }
  // We're not so set the map setup back to it's original parameters 
  else{
    map.mapTypeId = 'hybrid'
    street = undefined
  }
};


function enableStreetView(){
  // Define street with the map values at the moment x
  street = new google.maps.StreetViewPanorama(
    document.getElementById('map'), {
      position: map.center,
      enableCloseButton: true,
      pov: {
        heading: 34,
        pitch: 10
      }
    }
  );
  // set street view on map where we defined it
  map.setStreetView(street);
}




var valueSlider = document.getElementById("slider").value;
valueSlider = (2120 - valueSlider) / 10;
document.getElementById("test").innerHTML = valueSlider;

