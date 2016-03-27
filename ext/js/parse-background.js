function getTextNodes() {
    var textNodes = $('._3058');

    return textNodes;
}

function parseTextNodes() {
    var textArr = getTextNodes().map(function() {
        return $(this).text();
    });

    return textArr;
}

function getInputNode() {
    var inputNode = $('._1mf');

    return inputNode;
}

function parseInput() {
    var inputText = getInputNode().text();

    return inputText;
}

function decryptTextNodes() {
    var textArr = parseTextNodes();
    var myId;

    getMyIdAndKey().then(function(result) {
        myId = result.id;
        var promises = textArr.toArray().map(function(text) {
            try {
                var payload = JSON.parse(text);
                if (payload.recieverId) {
                    return decrypt(payload.recieverId, payload[myId]);
                } else {
                    return new Promise(function(resolve, reject) {
                        resolve(text);
                    });
                }
            } catch (err) {
                return new Promise(function(resolve, reject) {
                    resolve(text);
                });
            }
        });

        Promise.all(promises).then(function(decrypted) {
            var textNodes = getTextNodes();
            for (var i = 0; i < decrypted.length; i++) {
                $(textNodes[i]).text(decrypted[i].data);
            }
        });
    });
}

function getName() {
    return $('._17w2').text();
}

function encryptInput() {
    var inputText = parseInput();
    var payload = {};
    var recieverId, senderId;

    return getFriends().then(function(nameToId) {
        recieverId = nameToId[getName()];
        payload.recieverId = recieverId;
        return encryptAndSign(recieverId, inputText);
    }).then(function(result) {
        payload[recieverId] = result.data;
        return getMyIdAndKey();
    }).then(function(result) {
        senderId = result.id;
        return encryptAndSign(senderId, inputText);
    }).then(function(result) {
        payload[senderId] = result.data;
        getInputNode().text(JSON.stringify(payload));
    }).catch(function(err) {
        console.log(err);
    });
}

$(document).ready(function() {
    setTimeout(function() {
        decryptTextNodes();
    }, 1000);

    var numOfNodes = getTextNodes().length;

    setInterval(function() {
        if (numOfNodes != getTextNodes().length) {
            decryptTextNodes();
            numOfNodes = getTextNodes().length;
        }
    }, 1000);
});

