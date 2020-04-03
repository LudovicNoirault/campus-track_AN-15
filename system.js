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


const slider = document.getElementById('slider')
const sliderValue = document.getElementById('sliderValue')
// init value to display
sliderValue.innerHTML = slider.value;

// Then do it each time the slider change 
slider.onchange = () => {
    sliderValue.innerHTML = slider.value;
}