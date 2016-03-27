var accessToken;

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

function getFriendKey(id) {
    var promise = new Promise(function(resolve, reject) {
        getAccessToken().then(function(accessToken) {
            $.ajax({
                url: 'https://graph.facebook.com/' + id + '?access_token=' + accessToken
            }).done(function(res) {
                var idAndKey = {
                    id: id,
                    public_key: res.data.public_key
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
