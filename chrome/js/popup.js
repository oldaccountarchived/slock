/*global chrome, $, FileReader, localStorage*/

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
        sendToMessengerTabs(message);

        // Go to uploaded state.
        statePrivateKeyUploaded();
    };

    fileReader.readAsText(file);
}

function sendToMessengerTabs(message) {
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab) {
            chrome.tabs.sendMessage(tab.id, message, function(response) {
                console.log(response);
            });
        });
    });
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
