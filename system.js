var map;
function initMap() {
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
  });
}


$(function() {
	$('.range').next().text('2020'); // Valeur par défaut
	$('.range').on('input', function() {
		var $set = $(this).val();
		$(this).next().text($set);
	});
});