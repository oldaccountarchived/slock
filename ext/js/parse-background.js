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