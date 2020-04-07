var map
var street = undefined
var startingPos = {lat: 47.4474629, lng: -0.5421491}
var elevator

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
  
  elevator = new google.maps.ElevationService;
  
  // Check elevation when change location with drag
  map.addListener('dragend', function() {
    getElevation(map, elevator)
  });

  // Check elevation when change location with doubleclick
  map.addListener('dbclick', function() {
    getElevation(map, elevator)
  });
  
  // Check zoom level when change
  map.addListener('zoom_changed', function() {
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
  }); 
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


function getElevation(map, elevator){
  // wait 1 second before to call to prevent overpricing by calling for each micro change of the map
  setTimeout(function () {
    elevator.getElevationForLocations({
      'locations': [map.center]
    }, function(results, status) {
      console.log("elevation", results)
    });
  }, 1000);
}

// var valueSlider = document.getElementById("slider").value;
// valueSlider = (2120 - valueSlider) / 10;
// document.getElementById("test").innerHTML = valueSlider;

// Slider
$(function() {
  $('.range').next().text('2020'); // Valeur par défaut
	$('.range').on('input', function() {
    var set = $(this).val();
		$(this).next().text(set);
	});
});
