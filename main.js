const express = require('express');
const app = express();

var http = require('http');

var server = app.listen(process.env.PORT || 8093, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

app.get("/", function(req, res) {
    console.log("contacts");
    res.sendStatus(200);
    res.end();
});


module.exports = server;