const express = require('express');
const app = express();
const server = require('http').Server(app);

var http = require('http');

var s = http.createServer(function(request, response) {
    response.writeHead(200);
    response.write("Hello World");
    response.end();
});

s.listen(process.env.PORT);

console.log("Listening on http://127.0.0.1:8092/");


module.exports = server;