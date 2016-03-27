$(document).ready(function() {
    var waitForReact = setInterval(function() {
        if ($('._vzk')) {
            clearInterval(waitForReact);
            var elemContent = '<li><img id="padlockButton" style="padding: 3px;" height="24px" src="' + chrome.extension.getURL("img/unlocked.png") + '"></img></li>';
            $(elemContent).insertBefore($('._vzk').parent());
            setTimeout(function() {
                $('#padlockButton').click(function() {
                    $(this).attr('src', chrome.extension.getURL("img/locked.png"));
                    encryptInput().then(function() {
                        $('#padlockButton').attr('src', chrome.extension.getURL("img/unlocked.png"));
                    });
                });
            }, 1000);
        }
    }, 1000);
});
