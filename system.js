var map
var street = undefined
var startingPos = {lat: 47.4474629, lng: -0.5421491}
var elevator
var elevation
var waterLevelLimit = 20
var originalYear = 2020

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

  //
  getElevation(map, elevator) 

  // set street view on map where we defined it
  map.setStreetView(street);
}

function getElevation(map, elevator){
  // wait 0.5 second before calling elavation api to prevent overpricing by calling for each micro change of the map
  if(street){
    setTimeout(function () {
      elevator.getElevationForLocations({
        'locations': [map.center]
      }, function(results, status) {
        console.log("hey", results)
        elevation = results[0].elevation
      });
    }, 500);
  }
}

function sliderAction(value){
  document.getElementById("sliderYear").innerHTML = originalYear + value
  var overlay = document.getElementById("overlay")

  if(street && elevation <= waterLevelLimit){
    console.log("we doing good")
    console.log("before", overlay.style.height)
    overlay.style.height = value+"%"
    console.log("after", overlay.style.height)
  }
}

// var valueSlider = document.getElementById("slider").value;
// valueSlider = (2120 - valueSlider) / 10;
// document.getElementById("test").innerHTML = valueSlider;

// // Slider
// $(function() {
//   $('.range').next().text('2020'); // Valeur par défaut
// 	$('.range').on('input', function() {
//     var set = $(this).val();
// 		$(this).next().text(set);
// 	});
// });

// $(window).on('ready', function () {
//   // working slider   
//   $('#slider').slider()
  
//   var startPos = $("#slider").slider("value");
//   var endPos = '';
  
//   $("#slider").on("slidestop", function(event, ui) {
//         endPos = ui.value;

//         if (startPos != endPos) {
//           $("#sliderYer").innerHtml = endPos
          
//           if(street && elevation <= waterLevelLimit){
//             var h = $('.range').val()
            
//             console.log("range val", h)
//             $(".overlay")
//               .css('height', h);
//           }
//         }
//         startPos = endPos;
//     });
// // }

// //   $.on('input', function() {
// //     var set = $(this).val();
// //     $(this).next().text(set);

// //     console.log('test', street)
// //     // If we are in streetview and under 11 meters aboves the water level 
// //   });
// });