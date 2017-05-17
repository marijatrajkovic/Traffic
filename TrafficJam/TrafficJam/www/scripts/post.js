var position;

(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);


    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        document.getElementById("save").addEventListener("click", AddPost);
        document.getElementById("map").addEventListener("click", map);

        function AddPost() {

            var db = window.sqlitePlugin.openDatabase({ name: 'nova.db', location: 'default' });
            db.transaction(populateDB, errorCB, successCB);

            var lonlat = String(position);
            var describe = document.getElementById("describe").value;
            var tip;

            if (document.getElementById("tip1").checked)
                tip = 'pumpa';
            else if (document.getElementById("tip2").checked)
                tip = 'motel';
            else if (document.getElementById("tip3").checked)
                tip = 'bolnica';
            else if (document.getElementById("tip4").checked)
                tip = 'vulkanizer';

            var date = document.getElementById("PostDate").value;

            db.transaction(function (tx) {
                tx.executeSql('INSERT INTO POSTE (Description, LonLat, Type, Date) VALUES (" ' + describe + '"," ' + lonlat + '", " ' + tip + '", " ' + date + '")');
            }, errorCB, successCB);
        };
    }
    //

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();


function map() {

    var map = plugin.google.maps.Map.getMap({
        'camera': {
            'latLng': { lat: 43.3209, lng: 21.8958 },
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
        }
    });

    map.addEventListener(plugin.google.maps.event.MAP_READY, function onMapInit(map) {

        map.showDialog();
    });

    map.on(plugin.google.maps.event.MAP_CLICK, function (latLng) {

        position = latLng;

        map.addMarker({ 'position': latLng }, function (marker) { marker.showInfoWindow(); });

        alert("Map is clicked.\n" + latLng);
    });
}

function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS POSTE (id INTEGER PRIMARY KEY AUTOINCREMENT, Description TEXT, LonLat TEXT, Type TEXT, Date TEXT )');
}

function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}

function successCB() {
    alert("Successful processing SQL: ");
}
