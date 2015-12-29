$(document).ready(function() {
    load();
    var xmlHttp; //创建变量用于 XMLHTTP 对象
    var url; //创建ajax传递的url
    $('.add').click(function() {
        $(this).parent().parent().find('input').css("outline", "#A5A5A5 solid 1px").removeAttr('readonly');
    });

    $("#addsave").on('click', add);

    function add() {
        url = "/add";
        url = url + "?newstitle=" + $('.ad').eq(0).val();
        url = url + "&newsimg=" + $('.ad').eq(1).val();
        url = url + "&newscontent=" + $('.ad').eq(2).val();
        url = url + "&addtime=" + $('.ad').eq(3).val();
        url = url + "&source=" + $('.ad').eq(4).val();
        $td = $(this).parent().next();
        if ($td.children().prop('readonly') != true) {
            var isrepeat = checkrepeat($td.children().val());
            if (!isrepeat) {
                $(this).parent().parent().find('input').css("outline", "none").attr('readonly', 'true').val("");
                getresponse(xmlHttp, url);
            } else {
                alert('标题重复')
            }
        }
    }

    function load() {
        url = "/show";
        getresponse(xmlHttp, url);
    }

    function getresponse(xmlHttp, url) {
        xmlHttp = GetXmlHttpObject()
        if (xmlHttp == null) {
            alert("Browser does not support HTTP Request");
            return;
        }
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") {
                $("#newsm").append(xmlHttp.responseText);
                addfunc();
            }
        };
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
    }

    //response成功之后添加
    function addfunc() {
        $('.edit').click(function() {
            $(this).parent().parent().find('input').css("outline", "#A5A5A5 solid 1px").removeAttr('readonly');
            var editdata = $(this).parent().next().children().val();
            $(this).attr('data', editdata);
        });
        $('.save').click(function() {
            var $inputsave = $(this).parent().parent().find('input');
            url = "/update?editdata=" + $(this).prev().attr('data');
            url = url + "&newstitle=" + $inputsave.eq(0).val();
            url = url + "&newsimg=" + $inputsave.eq(1).val();
            url = url + "&newscontent=" + $inputsave.eq(2).val();
            url = url + "&addtime=" + $inputsave.eq(3).val();
            url = url + "&source=" + $inputsave.eq(4).val();
            if ($(this).parent().next().children().prop('readonly') != true) {
                $(this).parent().parent().find('input').css("outline", "none").attr('readonly', 'true');
                getresponse(xmlHttp, url);
            }
        });
        $('.del').click(function() {
            if (confirm("确定删除?")) {
                $td = $(this).parent().next();
                url = "/del";
                url = url + "?newstitle=" + $td.children().val();
                console.log(url);
                $(this).parent().parent().remove();
                getresponse(xmlHttp, url);
            }

        });
    }
    
    //查看是否重复
    function checkrepeat(arg) {
        var isrepeat = false;
        $('.un1').each(function(index) {
            if ($('.un1').eq(index).val() == arg) {
                isrepeat = true;
                return false;
            }
        });
        return isrepeat;
    }

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
