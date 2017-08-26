var http = require('http');
var url = require('url');
var fs = require('fs');
var mine = require('./mine').types;
var path = require('path');
var basepath = __dirname;
var my_http = {
    PORT: 8888,

    //var basepath = "E:\\Work\\GitHub\\HTML\\NodeJs\\miaosha";

    //basepath: "/ext_file_root/bucket-z/wfg/jd",

    server: http.createServer(function(request, response) {

            try {
                var pathname = url.parse(request.url).pathname;
                if(pathname =="/"){

                          pathname = "/index2.html";

                }
                console.log(pathname);
                var realPath = path.join(basepath, pathname);
                //var realPath = pathname;
                console.log(realPath);
                //console.log(realPath);
                var ext = path.extname(realPath);
                ext = ext ? ext.slice(1) : 'unknown';
                fs.exists(realPath, function(exists) {
                    if (!exists) {
                        response.writeHead(404, {
                            'Content-Type': 'text/plain'
                        });

                        response.write("This request URL " + pathname + " was not found on this server.");
                        response.end();
                    } else {
                        fs.readFile(realPath, "binary", function(err, file) {
                            if (err) {
                                response.writeHead(500, {
                                    'Content-Type': 'text/plain'
                                });
                                response.end(err);
                            } else {
                                var contentType = mine[ext] || "text/plain";
                                response.writeHead(200, {
                                    'Content-Type': contentType
                                });
                                response.write(file, "binary");
                                response.end();
                            }
                        });
                    }
                });
            } catch (err) {
                var contentType = "text/plain";
                response.writeHead(200, {
                    'Content-Type': contentType
                });
                response.write(err);
                response.end();
            }
        }

    ),
    start: function() {
        this.server.listen(8888);
        console.log("Server runing at port: " + 8888 + ".");
    }
};


module.exports = my_http;