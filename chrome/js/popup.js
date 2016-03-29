function handleKeyUpload(file, password) {
    var fileReader = new FileReader();

    fileReader.onload = function(event) {
        var content = event.target.result;
        var message = {
            messageType: "add key",
            key: content,
            password: password
        };

        chrome.tabs.query({}, function(tabs) {
            tabs.forEach(function(tab) {
                chrome.tabs.sendMessage(tab.id, message, function(response) {
                    console.log(response);
                });
            });
        });

        statePrivateKeyUploaded();
    };

    fileReader.readAsText(file);
}

function stateUploadOrGenerateKey() {
    $('#facebookAuth').hide();
    $('#privateKeyChoice').show();

    // Add buttonlisteners.
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

function stateKeypairGeneration() {
    $('#privateKeyChoice').hide();
    $('#keyPairGeneration').show();
}

function onDocumentReady() {
    if (localStorage.accessToken) {
        stateUploadOrGenerateKey();
    }
}

$(document).ready(onDocumentReady);
