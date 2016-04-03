/*global chrome, $, FileReader, localStorage*/

// Uploads key to messenger tabs.
function handleKeyUpload(file, password) {
    var fileReader = new FileReader();

    fileReader.onload = function(event) {
        var content = event.target.result;

        var message = {
            messageType: "add key",
            key: content,
            password: password
        };

        // Send key and password to open Facebook Messenger tab.
        sendToMessengerTabs(message, console.log);

        // Go to uploaded state.
        statePrivateKeyUploaded();
    };

    fileReader.readAsText(file);
}

// These two functions should do browser specific things.
// They should probably be split into separate files.
function sendToMessengerTabs(message, cb) {
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab) {
            chrome.tabs.sendMessage(tab.id, message, cb);
        });
    });
}

function sendToBackground(message, cb) {
    chrome.extension.sendMessage(message, cb);
}

function doPrivateKeyUpload() {
    var file = $('#fileInput')[0].files[0];
    var password = $('#password').val();
    if (password && file) {
        handleKeyUpload(file, password);
    } else {
        console.log('An error occured!');
        // Display an error
    }
}

function doKeypairGeneration() {
    var name = $('#name').val();
    var email = $('#email').val();
    var password = $('#password').val();

    var message = {
        name: name,
        email: email,
        password: password
    };

    sendToBackground(message, function(response) {
        // Do something with the key
    });
}

// State transitions.
function stateUploadOrGenerateKey() {
    $('#facebookAuth').hide();
    $('#privateKeyChoice').show();

    // Add button listeners.
    $('#uploadKeyButton')
        .click(statePrivateKeyUpload);
    $('#genKeyButton')
        .click(stateKeypairGeneration);
}

function statePrivateKeyUpload() {
    $('#privateKeyChoice').hide();
    $('#privateKeyUpload').show();

    // Add button listeners.
    $('#doUploadButton')
        .click(doPrivateKeyUpload);
}

function statePrivateKeyUploaded() {
    $('#privateKeyUpload').hide();
    $('#privateKeyUploaded').show();
}

function stateKeypairGeneration() {
    $('#privateKeyChoice').hide();
    $('#keyPairGeneration').show();

    // Add button listeners.
    $('#doGenerateButton')
        .click(doKeypairGeneration);
}

function stateKeypairGenerated() {
    $('#keyPairGeneration').hide();
    $('#keyPairGenerated').show();
}

// Set up listeners on document ready.
function onDocumentReady() {
    if (localStorage.accessToken) {
        stateUploadOrGenerateKey();
    }
}

$(document).ready(onDocumentReady);
