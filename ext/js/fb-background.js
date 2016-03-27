var accessToken;
var myIdAndKey;

function getFriends() {
    var promise = new Promise(function(resolve, reject) {
        getAccessToken().then(function(accessToken) {
            $.ajax({
                url: 'https://graph.facebook.com/me/friends?access_token=' + accessToken
            }).done(function(res) {
                var nameToId = {};
                res.data.forEach(function(friend) {
                    nameToId[friend.name] = friend.id;
                });
                console.log(nameToId);
                resolve(nameToId);
            });
        });
    });

    return promise;
}

function getMyIdAndKey() {
    var promise = new Promise(function(resolve, reject) {
        if (myIdAndKey) {
            resolve(myIdAndKey);
        } else {
            getAccessToken().then(function(accessToken) {
                $.ajax({
                    url: 'https://graph.facebook.com/me?fields=public_key&access_token=' + accessToken
                }).done(function(res) {
                    myIdAndKey = {
                        id: res.id,
                        publicKey: res.public_key
                    };
                    resolve(myIdAndKey);
                });
            });
        }
    });

    return promise;
}

function getFriendKey(id) {
    var promise = new Promise(function(resolve, reject) {
        getAccessToken().then(function(accessToken) {
            $.ajax({
                url: 'https://graph.facebook.com/' + id + '?fields=public_key&access_token=' + accessToken
            }).done(function(res) {
                var idAndKey = {
                    id: id,
                    publicKey: res.public_key
                };
                resolve(idAndKey);
            });
        });
    });

    return promise;
}

function getAccessToken() {
    var promise = new Promise(function(resolve, reject) {
        if (accessToken) {
            resolve(accessToken);
        } else {
            chrome.storage.local.get('accessToken', function(data) {
                resolve(data.accessToken);
            });
        }
    });

    return promise;
}
