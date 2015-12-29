var querystring = require('querystring');
var url = require('url');
var mysql = require('mysql');
var fs = require("fs");

function table(path, request, response) {
    var arg = url.parse(request.url).query;
    var newstitle = querystring.parse(arg).newstitle;
    var newsimg = querystring.parse(arg).newsimg;
    var newscontent = querystring.parse(arg).newscontent;
    var addtime = querystring.parse(arg).addtime;
    var source = querystring.parse(arg).source;
    var connection = mysql.createConnection({ //连接数据库
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'mytest',
        dateStrings: true,
    });

    if (path == '/load') {
        var action = 'select * from news';
        connection.query(action, function(err, rows, fields) {
            if (err) throw err;
            var l = rows.length;
            response.writeHead(200, {
                "Content-Type": "text/plain"
            });
            for (var i = 0; i < l; i++) {
                var newstitle = rows[i]['newstitle'];
                var newsimg = rows[i]['newsimg'];
                var newscontent = rows[i]['newscontent'];
                var addtime = rows[i]['addtime'];
                var source = rows[i]['source'];
                response.write('<div class="index-list-item">');
                response.write('<div class="index-list-image">');
                response.write('<img src="' + newsimg + '">');
                response.write('</div>');
                response.write('<div class="index-list-main-text">');
                response.write('<div class="index-list-main-title">' + newstitle + '</div>');
                response.write('<div class="index-list-main-abs">' + newscontent + '</div>');
                response.write('</div><div class="index-list-bottom">');
                response.write('<b class="tip-reason tip-fillred">' + source + '</b>');
                response.write('<b class="tip-time">' + addtime + '</b></div></div>');
            }
            response.end();
        });
    }
    if (path == '/show') {
        var action = 'select * from news';
        connection.query(action, function(err, rows, fields) {
            if (err) throw err;
            var l = rows.length;
            response.writeHead(200, {
                "Content-Type": "text/plain"
            });
            for (var i = 0; i < l; i++) {
                var newstitle = rows[i]['newstitle'];
                var newsimg = rows[i]['newsimg'];
                var newscontent = rows[i]['newscontent'];
                var addtime = rows[i]['addtime'];
                var source = rows[i]['source'];
                writehtml(response, newstitle, newsimg, newscontent, addtime, source);
            }
            response.end();
        });
    }
    if (path == '/add' && newstitle != '') {
        var action = 'insert into news(newstitle,newsimg,newscontent,addtime,source) value\
        ("' + newstitle + '","' + newsimg + '","' + newscontent + '","' + addtime + '","' + source + '")';
        var checkrepeat = 'select * from news where newstitle="' + newstitle + '"';
        connection.query(checkrepeat, function(err, rows, fields) {
            if (rows.length == 0) {
                connection.query(action, function(err1, rows1) {
                    console.log('add success...');
                    response.writeHead(200, {
                        "Content-Type": "text/plain"
                    });
                    writehtml(response, newstitle, newsimg, newscontent, addtime, source);
                    response.end();
                });
            }
        });
    }
    if (path == '/del') {
        var action = 'delete from news where newstitle ="' + newstitle + '"';
        connection.query(action, function(err, rows, fields) {
            if (err) throw err;
            response.writeHead(200, {
                "Content-Type": "application/javascript"
            });
            response.end("<script>alert('删除成功')</script>")
        });
    }
    if (path == '/update') {
        var newstitle0 = querystring.parse(arg).editdata;
        console.log(newstitle0);
        var action = 'update news set newstitle ="' + newstitle + '", newsimg ="' + newsimg +
            '", newscontent ="' + newscontent + '", addtime ="' + addtime +
            '", `source` ="' + source + '" where newstitle="' + newstitle0 + '"';
        console.log(action);
        connection.query(action, function(err, rows, fields) {

            response.writeHead(200, {
                "Content-Type": "application/javascript"
            });
            response.end("<script>alert('更新成功!')</script>")

        });
    }
}

function writehtml(response, newstitle, newsimg, newscontent, addtime, source) {
    response.write('<tr><td><a href="javascript:;" class="edit">编辑</a> ');
    response.write('<a href="javascript:;" class="save">保存</a> ');
    response.write('<a href="javascript:;" class="del">删除</a></td>');
    response.write('<td><input value="' + newstitle + '" class="un1" readonly="true" onfocus="this.select()"></td>');
    response.write('<td><input value="' + newsimg + '" readonly="true" onfocus="this.select()"></td>');
    response.write('<td><input value="' + newscontent + '" readonly="true" onfocus="this.select()"></td>');
    response.write('<td><input value="' + addtime + '" readonly="true" onfocus="this.select()"></td>');
    response.write('<td><input value="' + source + '" readonly="true" onfocus="this.select()"></td></tr>');
}

exports.table = table;
