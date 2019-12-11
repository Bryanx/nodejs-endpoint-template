const express = require('express');
const app = express();

app.get("/", function(req, res) {
    res.send("connected");
    res.end();
});

app.listen(process.env.PORT || 8080);