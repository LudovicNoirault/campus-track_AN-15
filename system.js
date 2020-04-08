const axios = require('axios').default;

axios.defaults.headers.common['x-access-token'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg2MzQyNDAzfQ.-fsk0IkO2mnVVaC2BHimxQxzzb7wyESAgPEKXzZ6INk"

let map
let checkAlt = true
let locationFetchedData
let street = undefined
let elevator
let elevation
const startingPos = {lat: 43.29, lng: 5.36}
const originalYear = 2020
const overlay = document.getElementById("overlay")

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
      overlay.style.visibility = "visible"

      if(!street){
        enableStreetView();
      }
    }
    // We're not so set the map setup back to it's original parameters 
    else{
      map.mapTypeId = 'hybrid'
      street = undefined
      overlay.style.visibility = "hidden"
    }
  });

  getElevation(map, elevator) 
  fetchMarseille()
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

  street.addListener('visible_changed', function() {
    overlay.style.visibility = "hidden"
  });   
}

function getElevation(map, elevator){
  // wait 0.5 second before calling elavation api to prevent overpricing by calling for each micro change of the map
  setTimeout(function () {
    elevator.getElevationForLocations({
      'locations': [map.center]
    }, function(results, status) {
      console.log("hey", results)
      elevation = results[0].elevation
    });
  }, 500);
}

function sliderActionYear(value){
  document.getElementById("sliderYear").innerHTML = value
    
  locationFetchedData.forEach(data => {
    if( value == data.year){
      if(street){
        if(checkAlt){
          overlay.style.height = ( ( ( data.sea_level - locationFetchedData[2].sea_level ) - elevation ) * 10) + "%"
        }
        else{
          overlay.style.height = ( ( data.sea_level - locationFetchedData[2].sea_level) *10) + "%"
        }
      }
      document.getElementById("riseValue").innerHTML = (data.sea_level - locationFetchedData[2].sea_level) +" Mètres"
    }
  });

  if(value == 2020){
    overlay.style.height = "0%"
  }
}

const checkbox = document.getElementById('checkboxAlt')

checkbox.addEventListener('change', (event) => {
  if (event.target.checked) {
    checkAlt = true
  } else {
    checkAlt = false
  }
})

function fetchMarseille(){
  axios.get('http://localhost:3000/climates')
  .then(function (response) {
    locationFetchedData = response.data.result
    console.log(locationFetchedData)
  })
  .catch(function (error) {
    console.log("Error fetching data :", error);
  })
}