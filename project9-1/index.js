var server = require('./nodejs/server');
var router = require("./nodejs/router");
var requestHandlers = require("./nodejs/requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/load"] = requestHandlers.load;
handle["/system"] = requestHandlers.startsystem;
handle["/show"] = requestHandlers.show;
handle["/add"] = requestHandlers.add;
handle["/del"] = requestHandlers.del;
handle["/update"] = requestHandlers.update;
handle["/upload"] = requestHandlers.upload;
server.start(router.route, handle);