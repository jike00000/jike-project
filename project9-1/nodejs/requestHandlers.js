var database = require("./table.js");

var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response, request, pathname) {
    console.log("Request handler 'start' was called.");
    console.log(pathname);
    var ext = pathname.match(/(\.[^.]+|)$/)[0]; //取得后缀名
    console.log(ext);
    if (ext == "") {
        fs.readFile('./html/news.html', 'utf-8', function(err, data) { //读取内容
            if (err) throw err;
            response.writeHead(200, {
                "Content-Type": "text/html"
            });
            response.write(data);
            response.end();
        });

    } else {
        fs.readFile("." + request.url, function(err, data) { //读取内容
            if (err) throw err;
            response.writeHead(200, {
                "Content-Type": {
                    ".css": "text/css",
                    ".js": "application/javascript",
                    ".png": "image/png",
                    ".jpg": "image/jpeg",
                    ".jpg": "image/jpg",
                }[ext]
            });
            response.write(data);
            response.end();
        });
    }
}

function load(response, request, pathname) {
    database.table(pathname, request, response);
}

function startsystem(response, request, pathname) {
    fs.readFile('./html/NewsSystem.html', 'utf-8', function(err, data) { //读取内容
        if (err) throw err;
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
        response.write(data);
        response.end();
    });
}

function show(response, request, pathname) {
    database.table(pathname, request, response);
}

function add(response, request, pathname) {
    database.table(pathname, request, response);
}
function del(response, request, pathname) {
    database.table(pathname, request, response);
}
function update(response, request, pathname) {
    database.table(pathname, request, response);
}

exports.start = start;
exports.startsystem = startsystem;
exports.load = load;
exports.show = show;
exports.add = add;
exports.del = del;
exports.update = update;

