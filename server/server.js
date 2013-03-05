/*jslint vars: true, plusplus: true, devel: true, nomen: true,
indent: 4, maxerr: 50, node: true */

(function () {
    "use strict";
    
    var https = require("https");
    var fs = require("fs");
    var connect = require("connect");
    var path = require("path");
    
    var options = {
        key: fs.readFileSync(path.resolve(__dirname, "cert/certificate.key")),
        cert: fs.readFileSync(path.resolve(__dirname, "cert/certificate.cert"))
    };
    
    var app = connect()
        .use(connect.logger("dev"))
        .use(connect["static"](path.resolve(__dirname, "public")))
        .use(function (req, res) {
            res.end("hello world\n");
        });
    
    var server = https.createServer(options, app)
        .listen(3443, "0.0.0.0");
    
    console.log("Server running at http://0.0.0.0:3443/");
}());