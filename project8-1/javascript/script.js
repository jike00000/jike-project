$(document).ready(function() {
    //标签栏切换
    $divider = $('#index_view_navigator .divider');
    $footer = $('#index_view_navigator .footer');
    $down = $('.down-triangle');
    $tr = $("tr:gt(1)");
    $(".more").click(function() {
        $tr.show();
        $divider.show();
        $footer.show();
        $down.css("display", "none");
    });
    $(".less").click(function() {
        $tr.hide();
        $divider.hide();
        $footer.hide();
        $down.css("display", "block");
    });


    //设定图片宽度
    $('.g-imagebox img').width($('.topic-gallery-container').width());
    $(window).resize(function() {
        $('.g-imagebox img').width($('.topic-gallery-container').width());
    });

    load(); //从数据库加载图片

    //增加滚动图片
    var ul = $('.g-list')[0];
    ul.innerHTML += ul.innerHTML;


    var n = 1;
    var m = 1;
    var ico = $('.g-icons i');

    //tab栏滚动
    function tab() {
        for (var i = 0; i < ico.length; i++) {
            ico[i].className = '';
        }
        ico[n % 3].className = 'cur';
    }

    //滚动定时器
    setInterval(function() {
        $('.g-list').css('transition', 'transform 350ms ease-in');
        $('.g-list').css('transform', 'translateX(-' + 100 * n + '%)');

        setTimeout(function() {
            $('.g-list').css('transition', 'none');
            if (n == 4) {
                $('.g-list').css('transform', 'translateX(-100%)');
                // $('.g-list').css('transform', 'translateX(-' + ($('.g-item-innerbox').width() + 10) + 'px)');
                n = 1;
            }
            ++n;
        }, 700);
        tab();
    }, 3000)

    //热点滚动
    setInterval(function() {
        $('.ui-hotword-content').css('transition', 'margin-top 1s ease-out 0s');
        $('.ui-hotword-content').css('margin-top', '-' + 28 * m + 'px');
        setTimeout(function() {
            if (m == 10) {
                $('.ui-hotword-content').css('transition', 'none');
                $('.ui-hotword-content').css('margin-top', '0');
                m = 0;
            }
            ++m;
        }, 1400);
    }, 1500)

    //点击加载
    $('.ui-refresh').click(function() {
        // $('.ui-refresh span').text("");
        $('.ui-refresh div').addClass("ui-refresh-loading");
        $('.ui-refresh span').text("加载中...");

        setTimeout(function() {
            load();
            // $('.index-list').append($('.index-list-item').clone().slice(0, 5));
            $('.ui-refresh div').removeClass("ui-refresh-loading");
            $('.ui-refresh span').text("点击加载更多");
        }, 500);
    });


    var xmlHttp; //创建变量用于 XMLHTTP 对象

    function load() {
        xmlHttp = GetXmlHttpObject()
        if (xmlHttp == null) {
            alert("Browser does not support HTTP Request");
            return;
        }
        var url = "php/newsload.php";
        xmlHttp.onreadystatechange = stateChanged;
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
    }

    //当 XMLHTTP 对象的状态发生改变，则执行该函数。
    //在状态变成 4 （或 "complete"）时，用响应文本填充clickload 的内容。
    function stateChanged() {
        if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") {
            $(".index-list").append(xmlHttp.responseText);
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
