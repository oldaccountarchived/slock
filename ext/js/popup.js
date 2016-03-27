if (localStorage.accessToken) {
    var graphUrl = "https://graph.facebook.com/me?" + localStorage.accessToken + "&callback=displayUser";
    console.log(graphUrl);

    function displayUser(user) {
        console.log(user);
    }

    window.onload = function() {
        var script = document.createElement("script");
        script.src = graphUrl;
        document.body.appendChild(script);
    };
}

function handleKeyUpload(files) {
    var file = files[0];
    var fileReader = new FileReader();

    fileReader.onload = function(event) {
        var content = event.target.result;
        var message = {
            messageType: "add key",
            key: content,
            password: $('#password').val()
        };

        chrome.tabs.query({}, function(tabs) {
            tabs.forEach(function(tab) {
                chrome.tabs.sendMessage(tab.id, message, function(response) {
                    console.log(response);
                });
            });
        });

        console.log(content);
    };

    fileReader.readAsText(file);
}

$(document).ready(function() {
    $('#fileInput').change(function() {
        handleKeyUpload(this.files);
    });

    $('#password').keyup(function() {
        var empty = !($(this).val().length > 0);
        if (empty) {
            $('#fileInput').attr('disabled', 'disabled');
        } else {
            $('#fileInput').attr('disabled', false);
        }
    });

    if (localStorage.accessToken) {
        $('#fbButton').remove();
    }
});
