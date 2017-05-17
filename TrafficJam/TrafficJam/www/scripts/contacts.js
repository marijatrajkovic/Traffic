// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    document.addEventListener('deviceready', findContact, false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        document.getElementById("createContact").addEventListener("click",createContact);
        document.getElementById("deleteContact").addEventListener("click",deleteContact);


    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();

function createContact()
{
    var myContact = navigator.contacts.create({ "displayName": "Test User" });
    myContact.save(contactSuccess, contactError);

    function contactSuccess() {
        alert("Contact is saved")
    }
    function contactError(message) {
        alert('Failed because:' + message);
    }
}
function deleteContact()
{
    var options = new ContactFindOptions();
    options.filter = "Test User";
    options.multiple = false;
    fields = ["displayName"];

    navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

    function contactfindSuccess(contacts) {
        var contact = contacts[0];
        contact.remove(contactRemoveSuccess, contactRemoveError);

        function contactRemoveSuccess(contact)
        {
            alert("Contact Deleted");
        }
        function contactRemoveError(message) {
            alert('Failed because:' + message);
        }
    }

    function contactfindError(message)
    {
        alert('Failed because:' + message);
    }
}

function findContact() {
    var options = new ContactFindOptions();
    options.filter = "";
    options.multiple = true;

    fields = ["displayName"];
    navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

    function contactfindSuccess(contacts) {
        var table = document.getElementById("tabela");

        for (var i = 0; i < contacts.length; i++)
        {
            var row = table.insertRow(i + 1);
            row.innerHTML = contacts[i].displayName;
        }
    }
    function contactfindError(message) {
        alert('Failed because:' + message);
    }
}

