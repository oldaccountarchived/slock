var publicKeys = {};
var privateKey;

function addPublicKey(userId, publicKey) {
    // Get usable public key
    publicKey = openpgp.key.readArmored(publicKey).keys;

    if (publicKeys[userId] && publicKeys[userId] != publicKey) {
        // Alert the user.
    } else {
        publicKeys[userId] = publicKey;
    }
}

function getPublicKey(userId) {
    var promise = new Promise(function(resolve, reject) {
        var publicKey = publicKeys[userId];
        if (publicKey) {
            resolve(publicKey);
        } else if (userId == 'me') {
            getMyIdAndKey().then(function(idAndKey) {
                if (idAndKey.publicKey) {
                    addPublicKey(userId, idAndKey.publicKey);
                    resolve(publicKeys[userId]);
                } else {
                    reject("No public key available for this user.");
                }
            });
        } else {
            getFriendKey(userId).then(function(idAndKey) {
                if (idAndKey.publicKey) {
                    addPublicKey(userId, idAndKey.publicKey);
                    resolve(publicKeys[userId]);
                } else {
                    reject("No public key available for this user.");
                }
            });
        }
    });

    return promise;
}

function addPrivateKey(privKey, password) {
    // Get usable private key.
    privateKey = openpgp.key.readArmored(privKey).keys;

    // BAD: FOR TESTING, UNTIL PASSWORD DIALOG WORKS, SAVE PASSWORD.
    chrome.storage.local.set({privateKey: privKey});
    chrome.storage.local.set({password: password});

    if (password) {
        unlockPrivateKey(password);
    }
}

function unlockPrivateKey(password) {
    var success = privateKey[0].decrypt(password);
}

function decrypt(userId, message) {
    return getPublicKey(userId).then(function(publicKey) {
        try {
            message = openpgp.message.readArmored(message);
        } catch(err) {
            // Something is wrong with the message, alert the user.
            console.log(err);
        }

        var options = {
            message: message,
            publicKeys: publicKey,
            privateKey: privateKey[0]
        };

        return openpgp.decrypt(options);
    });
}

function encryptAndSign(userId, message) {
    return getPublicKey(userId).then(function(publicKey) {
        var options = {
            data: message,
            publicKeys: publicKey,
            privateKeys: privateKey,
            armor: true
        };

        return openpgp.encrypt(options);
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.messageType) {
    case "add key":
        console.log("Adding new key...");
        addPrivateKey(request.key, request.password);
        decryptTextNodes();
        break;
    default:
        console.log("Message type is not valid.");
    }
});

function chromeStoragePrinter(string) {
    chrome.storage.local.get(string, function(data) {
        console.log(data);
    });
}

$(document).ready(function() {
    chrome.storage.local.get('privateKey', function(data1) {
        chrome.storage.local.get('password', function(data2) {
            if(data1.privateKey && data2.password) {
                addPrivateKey(data1.privateKey, data2.password);
                decryptTextNodes();
            }
        });
    });
});
