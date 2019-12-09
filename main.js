const express = require('express');
const app = express();

var favicon = require('serve-favicon');

app.use(favicon(__dirname + '/favicon.ico'));

app.get("/", function(req, res) {
    res.send("connected");
    res.end();
});

function syncCookies(request, response) {
    console.log("syncCookies()");
    console.log("request: " + request.toString());
    let cookies = request.headers.cookie;
    let responseHeaders = {
        "Access-Control-Allow-Origin": "*"
    };
    if (!cookies) {
        response.writeHead(200, responseHeaders);
        response.end("1");
        return;
    }
    cookies = cookies.split(";");
    cookies.forEach(function(cookie) {
        let cookieParts = cookie.trim().split("="),
            name = cookieParts[0],
            value = cookieParts[1];
        if (name.search(/^(_vis_opt_|_vwo)/) !== -1) {
            responseHeaders["Set-Cookie"] = responseHeaders["Set-Cookie"] || [];
            // Expire any VWO cookies after 10 years.
            // Set the cookie on root path so that it's accessible on all paths
            // Set the domain to .<eTld+1>
            responseHeaders["Set-Cookie"].push(`${name}=${value};path=/;domain=.<eTld+1>;expires=${new Date(Date.now() + 10 * 365 * 24 * 3600 * 1000).toGMTString()}`);
            // e.g. for a website example.abc.com eTld would be "com". So eTld+1 would be "abc.com".
            // If you are not sure about what is the value in your case, you can contact the VWO support team.
            // responseHeaders["Set-Cookie"].push(`${name}=${value};path=/;domain=.abc.com;expires=${new Date(Date.now() + 10 * 365 * 24 * 3600 * 1000).toGMTString()};`);
        }
    });
    console.log("response: " + response.toString());
    response.writeHead(200, responseHeaders);
    response.end("1");
}
// If you are using express framework e.g., you can use the above code as follows
app.get('/sync', function (request, response) {
    return syncCookies(request, response)
});

app.listen(process.env.PORT || 8080);