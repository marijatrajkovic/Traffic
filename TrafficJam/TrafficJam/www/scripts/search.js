// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var position = [];
function mark(pos, type)
{
    this.pos = pos;
    this.type = type;
}
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    document.addEventListener('deviceready', LoadPost, false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        document.getElementById("button").addEventListener("click", showMap);
        document.getElementById("tip2").addEventListener("change", showSortedMap);

    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();

function LoadPost()
{
    var db = window.sqlitePlugin.openDatabase({ name: 'nova.db', location: 'default' });

    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM POSTE",[], querySuccess, errorCB);
    }, errorCB, successCB);
}
function querySuccess(tx, results)
{
    var len = results.rows.length;
    for (var i = 0; i < len; i++)
    {
        var m = new mark(results.rows.item(i).LonLat, results.rows.item(i).Type);
        position.push(m);
    }
}

function LoadPost1() {
    var db = window.sqlitePlugin.openDatabase({ name: 'nova.db', location: 'default' });

    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM POSTE where Type='pumpa'", [], querySuccess, errorCB);
    }, errorCB, successCB);
}

function successCB() {
    alert("Successful processing SQL: ");
}
function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}

function showMap() {

    var div = document.getElementById("map_canvas");
    var pos = { lat: 43.3209, lng: 21.8958 };

    var map = plugin.google.maps.Map.getMap(div, {
        'camera': {
            'latLng': pos,
            'zoom': 20
        }
    });

    map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);

    function onMapReady() {
        map.clear();

        map.addMarker({
            'position': pos,
            'title': "Your location",
            'draggable': false

        }, function (marker) {
            marker.showInfoWindow();
        });

        addMarkers(position, function (markers) {
            markers[markers.length - 1].showInfoWindow();
        });
        function addMarkers(position, callback) {
            var markers = [];

            function onMarkerAdded(marker) {
                markers.push(marker);
                if (markers.length === position.length) {
                    callback(markers);
                }
            }
            position.forEach(function (element) {
                var str=[];
                str = element.pos.split(",");
                var lat = str[0];
                var lng = str[1];
                var markerOptions = {
                    'position': { lat: lat, lng: lng },
                    'title': element.type,
                    'draggable': false,
                    'icon': 'yellow'
                };
                map.addMarker(markerOptions, onMarkerAdded);
            });

        }
    }
}
function showSortedMap() {
    var position=[];
    LoadPost1();
    showMap();
}