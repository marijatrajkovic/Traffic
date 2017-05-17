// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var lat;
var lng;

(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    document.addEventListener('deviceready', getPosition, false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        document.getElementById("see").addEventListener("click", showOnMap);
        document.getElementById("watchPosition").addEventListener("click", watchPosition);

    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();


function getPosition() {

    var options = {
        enableHighAccuracy: true,
        maximumAge: 3600000
    }

    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    function onSuccess(position) {

        lat = position.coords.latitude;
        lng = position.coords.longitude;

    };

    function onError(error) {
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
}

function watchPosition() {

    var options = {
        maximumAge: 3600000,
        timeout: 3000,
        enableHighAccuracy: true,
    }

    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

    function onSuccess(position) {

        alert('Latitude: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude );
    }

    function onError(error) {
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }

}
function showOnMap() {
    var map = plugin.google.maps.Map.getMap({
        'camera': {
            'latLng': { lat: lat, lng: lng },
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
        }
    });
    map.addEventListener(plugin.google.maps.event.MAP_READY, function onMapInit(map) {
        map.showDialog()

    });
}

