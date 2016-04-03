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
                if (payload.senderId) {
                    return decrypt(payload.senderId, payload[myId]);
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
            var textNodes = getTextNodes().children();
            for (var i = 0; i < decrypted.length; i++) {
                $(textNodes[i]).text(decrypted[i].data);
            }
        });
    });
}

function getNames() {
    return $('._17w2').text();
}

function encryptInput() {
    var inputText = parseInput();
    var payload = {};
    var recieverIds = [];
    var senderId;

    return getFriends().then(function(nameToId) {
        var names = getNames().split(', ');

        var promises = names.map(function(name) {
            var recieverId = nameToId[name];
            recieverIds.push(recieverId);
            return encryptAndSign(recieverId, inputText);
        });

        return Promise.all(promises);

    }).then(function(results) {
        recieverIds.forEach(function(recieverId, index) {
            payload[recieverId] = results[index].data;
        });

        return getMyIdAndKey();
    }).then(function(result) {
        senderId = result.id;
        payload.senderId = senderId;

        return encryptAndSign(senderId, inputText);
    }).then(function(result) {
        payload[senderId] = result.data;
        // getInputNode().text(JSON.stringify(payload));
        sendMessage(JSON.stringify(payload), senderId, recieverIds[0]);
    }).catch(function(err) {
        console.log(err);
    });
}

$(document).ready(function() {
    setTimeout(function() {
        decryptTextNodes();
    }, 1000);

    var numOfNodes = getTextNodes().length;
    var nodes = getTextNodes();

    setInterval(function() {
        var length = getTextNodes().length - 1;
        if (numOfNodes != getTextNodes().length || getTextNodes()[length] !== nodes[length]) {
            decryptTextNodes();
            nodes = getTextNodes();
            numOfNodes = getTextNodes().length;
        }
    }, 1000);
});

