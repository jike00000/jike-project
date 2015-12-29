function route(handle, pathname, response, request) {
    console.log("route a request for " + pathname);
    var ext = pathname.match(/(\.[^.]+|)$/)[0]; //取得后缀名
    var array = ['.jpg', '.css', '.png', '.js'];
    if (typeof handle[pathname] === 'function' ) {
        handle[pathname](response, request, pathname);

    } else if (array.indexOf(ext) > -1) {
        handle["/"](response, request, pathname);

    } else {
        console.log("no request handler found for" + pathname);
        response.writeHead(404, {
            "Content-Type": "text/plain"
        });
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;
