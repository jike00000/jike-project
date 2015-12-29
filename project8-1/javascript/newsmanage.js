$(document).ready(function() {
    var xmlHttp; //创建变量用于 XMLHTTP 对象

    load();
    document.getElementById("add").onclick = addnews;

    //取得input的值
    function getValue(arg) {
        return document.getElementById(arg).value;
    }

    function addnews() {
        xmlHttp = GetXmlHttpObject();
        if (xmlHttp == null) {
            alert("Browser does not support HTTP Request");
            return;
        }
        var url = "php/newsadd.php";
        url = url + "?newsid=" + getValue("newsid");
        url = url + "&newstitle=" + getValue("newstitle");
        url = url + "&newsimg=" + getValue("newsimg");
        url = url + "&newscontent=" + getValue("newscontent");
        url = url + "&addtime=" + getValue("addtime");
        url = url + "&source=" + getValue("source");
        xmlHttp.onreadystatechange = stateChanged;
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
    }

    function load() {
        xmlHttp = GetXmlHttpObject();
        if (xmlHttp == null) {
            alert("Browser does not support HTTP Request");
            return;
        }
        var url = "php/newsshow.php";
        xmlHttp.onreadystatechange = stateChanged;
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
    }

    //当 XMLHTTP 对象的状态发生改变，则执行该函数。
    //在状态变成 4 （或 "complete"）时，用响应文本填充clickload 的内容。
    function stateChanged() {
        if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") {
            $('#newsm').append(xmlHttp.responseText); //加载数据库内容
            $('.del').click(function(e) {
                $(this).parent().parent().remove(); //删除当前行

                xmlHttp = GetXmlHttpObject();
                if (xmlHttp == null) {
                    alert("Browser does not support HTTP Request");
                    return;
                }
                var url = "php/newsdel.php";
                url = url + '?newsid=' + $(this).parent().next().text();
                console.log(url);
                xmlHttp.onreadystatechange = function() {
                    if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") {
                        console.log(xmlHttp.responseText);   //在控制台打印返回内容
                    }
                };
                xmlHttp.open("GET", url, true);
                xmlHttp.send(null);
            });
        }
    }

    //为不同浏览器创建不同 XMLHTTP 对象
    function GetXmlHttpObject() {
        var xmlHttp = null;
        try {
            // Firefox, Opera 8.0+, Safari
            xmlHttp = new XMLHttpRequest();
        } catch (e) {
            //Internet Explorer
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        return xmlHttp;
    }

});
