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

function encryptInput() {
    var inputText = parseInput();
    encryptAndSign('test', inputText).then(function(result) {
        console.log(result);
        getInputNode().text(JSON.stringify(result));
        decrypt('test', result.data).then(function(result) {
            console.log(result);
        }).catch(function(err) {
            console.log(err);
        });
    }).catch(function(err) {
        console.log(err);
    });
}
