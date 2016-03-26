var publicKeys;
var privateKeyEnc;
var privateKey;

function addPublicKey(userId, publicKey) {
    // Get usable public key
    publicKey = openpgp.key.readArmored(publicKey).keys;

    if (publicKeys[userId]) {
        if (publicKeys[userId] != publicKey) {
            // Alert the user.
        }
    } else {
        publicKeys[userId] = publicKey;
    }
}

function addPrivateKey(privateKey, password) {
    privateKey = openpgp.key.readArmored(privateKey).keys;
}

function unlockPrivateKey(password) {
    privateKey = privateKeyEnc.decrypt(password);
    // Possibly set up a timeout to delete this after a period of time.
}

function decrypt(userId, message, password, cb) {
    var publicKey = publicKeys[userId];

    if (publicKey) {
        try {
            message = openpgp.message.readArmored(message);
        } catch(err) {
            // Something is wrong with the message, alert the user.
            console.log(err);
        }

        var promise = openpgp.decryptAndVerifyMessage(privateKey, publicKey, message);
        promise.then(function(result) {
            // Validate the signatures, provide result in callback.
        });
    } else {
        // No public key, alert the user.
    }
}

function encryptAndSign(userId, message, password, cb) {
    var publicKey = publicKeys[userId];

    if (publicKey) {
        var promise = openpgp.signAndEncryptMessage(publicKeys, privateKey, message);
    } else {
        // No public key, alert the user.
    }
}

document.onload = function() {
    publicKeys = localStorage.publicKeys || {};
    privateKeyEnc = localStorage.privateKeyEnc;
}();
