const express = require('express');
const app = express();

var favicon = require('serve-favicon');

app.use(favicon(__dirname + '/favicon.ico'));

app.get("/", function(req, res) {
    console.log("contacts");
    res.send("connected");
    res.end();
});

app.listen(process.env.PORT || 8080);