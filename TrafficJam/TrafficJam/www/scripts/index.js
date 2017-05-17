// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);


        document.getElementById("signinface").onclick = function () {
            CordovaFacebook.login({
                permissions: ['email', 'user_likes'],
                onSuccess: function (result) {
                    if (result.declined.length > 0) {
                        alert("The User declined something");
                    }
                    CordovaFacebook.graphRequest({
                        path: '/me',
                        params: { fields: 'email,id,first_name,last_name,gender,link,name,birthday,picture.type(large),cover,hometown' },
                        onSuccess: function (userData) {
                            localStorage.setItem("email", userData.email);
                            localStorage.setItem("id", userData.id);
                            localStorage.setItem("first_name", userData.first_name);
                            localStorage.setItem("last_name", userData.last_name);
                            localStorage.setItem("gender", userData.gender);
                            localStorage.setItem("name", userData.name);
                            localStorage.setItem("birthday", userData.birthday);
                            localStorage.setItem("picture", userData.data.url);
                            localStorage.setItem("cover", userData.cover.source);
                            localStorage.setItem("hometown", userData.hometown);
                            location.href = "home.html";
                        },
                        onFailure: function (result) {
                            if (result.error) {
                                Error.log('error', 'There was an error in graph request:' + result.errorLocalized);

                            }
                        }
                    });
                },
                onFailure: function (result) {
                    if (result.cancelled) {
                        alert("The user doesn't like my app");
                    } else if (result.error) {
                        alert("There was an error:" + result.errorLocalized);
                    }
                }

            });

        }
    
    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();

//canvas
window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "24px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("TRAFFIC", canvas.width / 2, canvas.height);
};

