var successURL = 'https://www.facebook.com/connect/login_success.html';

// Modified from https://github.com/nobuf/facebook-connect-for-chrome-extension
function onFacebookLogin() {
    if (!localStorage.accessToken) {
        chrome.tabs.getAllInWindow(null, function(tabs) {
            tabs.forEach(function(tab) {
                if (tab.url.indexOf(successURL) == 0) {
                    chrome.tabs.onUpdated.removeListener(onFacebookLogin);
                    var params = tab.url.split('#')[1];
                    var accessToken = params.split('&')[0];
                    localStorage.accessToken = accessToken;
                    return;
                }
            });
        });
    }
}

chrome.tabs.onUpdated.addListener(onFacebookLogin);
