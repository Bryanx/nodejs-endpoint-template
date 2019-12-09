const express = require('express');
const app = express();

app.get("/", function(req, res) {
    console.log("contacts");
    res.send("connected");
    res.end();
});

app.listen(process.env.PORT || 8080);