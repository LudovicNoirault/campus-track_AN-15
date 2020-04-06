var map;
var street = undefined;

function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.4474629, lng: -0.5421491},
    zoom: 8,
    disableDefaultUI: true,
    mapTypeId: 'hybrid',
      styles: [
        {
        featureType: "road",
        stylers: [
                 {visibility: "off"}
             ]
        }
      ]
    }
  )
};

var t=setInterval(mapState,1000);

function mapState(){
  console.log("zoom level", map.zoom)
  if(map.zoom > 19){
    map.mapTypeId = "satellite"
    
    if(!street){

      console.log("new street")

      street = new google.maps.StreetViewPanorama(
        document.getElementById('map'), {
          position: map.center,
          pov: {
            heading: 34,
            pitch: 10
          }
        });
       map.setStreetView(street);
    }
  }
  else{
    map.mapTypeId = 'hybrid'
  }
};

$(function() {
	$('.range').next().text('2020'); // Valeur par défaut
	$('.range').on('input', function() {
		var $set = $(this).val();
		$(this).next().text($set);
	});
});