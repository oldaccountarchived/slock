'use strict';

// Load env variables.
require('dotenv').config();

let express = require('express');
let request = require('request');

let app = express();

app.route('/token/:token').get((req, res) => {
    let token = req.params.token;
    let url = `https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.APP_ID}&client_secret=${process.env.APP_SECRET}&fb_exchange_token=${token}`;

    console.log(url);

    request(url, (err, fbRes, body) => {
        console.log(body);
    });
});

app.listen(4242);
