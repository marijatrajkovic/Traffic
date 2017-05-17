// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
 

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        document.getElementById("save").addEventListener("click", AddProfile);
        document.getElementById("TakePicture").addEventListener("click", cameraTakePicture);
        document.getElementById("GetPicture").addEventListener("click", cameraGetPicture);

     
    
        var db = window.sqlitePlugin.openDatabase({ name: 'nova.db', location: 'default' });

        document.getElementById("first_name").innerHTML = localStorage.first_name;
        document.getElementById("last_name").innerHTML = localStorage.last_name;
        document.getElementById("email").innerHTML = localStorage.email;
        document.getElementById("gender").innerHTML = localStorage.gender;
        document.getElementById("okvir").src = localStorage.picture;
  

    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();

function AddProfile() {
    var db = window.sqlitePlugin.openDatabase({ name: 'nova.db', location: 'default' });
    db.transaction(populateDB, errorCB, successCB);

    var ime = document.getElementById("first_name").value;
    var prezime = document.getElementById("last_name").value;
    var email = document.getElementById("email").value;
    var pol = document.getElementById("gender").value;

    db.transaction(function (tx){
        tx.executeSql('INSERT INTO PROFILE (Ime,Prezime,Email,Pol) VALUES (" ' + ime + '"," ' + prezime + '"," ' + email + '"," ' + pol + '")');
    }, errorCB, successCB);
}

    function populateDB(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS PROFILE (id INTEGER PRIMARY KEY AUTOINCREMENT, Ime TEXT, Prezime TEXT, Email TEXT, Pol TEXT )');
    }

    function errorCB(err) {
        alert("Error processing SQL: " + err.code);
    }

    function successCB() {
        alert("Successful processing SQL: ");
    }

function cameraTakePicture() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });

    function onSuccess(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
    }

function cameraGetPicture() {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });

        function onSuccess(imageURL) {
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageURL;
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }

    }