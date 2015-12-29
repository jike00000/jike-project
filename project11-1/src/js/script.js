$(document).ready(function() {
    // 侧边栏切换
    $(".lesson-nav li").mouseenter(function() {
        $(".lesson-nav ul").css({
            "overflow": "visible",
            "height": "408px",
            "z-index": "1000"
        });
        $(".lesson-list-show").css({
            "min-height": "410px",
            "width": "401px"
        });
        $(".lesson-nav>p").removeClass("line");
    });
    $(".lesson-nav li").mouseleave(function() {

        $(".lesson-nav ul").css({
            "overflow": "hidden",
            "height": "302px",
            "z-index": "1"
        });
        $(".lesson-nav>p").addClass("line");
    });

    //箭头淡入淡出
    $(".index-banner").mouseenter(function() {
        $(".banner-left-btn").fadeIn("3000");
        $(".banner-right-btn").fadeIn("3000");

    });
    $(".index-banner").mouseleave(function() {
        $(".banner-left-btn").fadeOut("3000");
        $(".banner-right-btn").fadeOut("3000");
    });

    //标签栏切换
    $(".hot-lesson li").each(function(index) {
        var tabOn = $(this);
        $(this).mouseenter(function() {
            $(".hot-lesson .on").removeClass("on");
            $(this).addClass("on");
            $("#hot-lessonbox .contentin").removeClass("contentin");
            $("#hot-lessonbox ul").eq(index).addClass("contentin");
        });
    });


    for (var i = 0; i < 5; i++) {
        var content = $("#hot-lessonbox ul").eq(i + 1).find("li");
        for (var j = 0; j < 7; j++) {
            $("#hot-lessonbox ul").eq(i + 1).append(content.clone());
        }
    }

    //课程块显示效果
    $(".learn-card a").each(function(index) {
        $(this).mouseenter(function() {
            $(this).css("border", "1px solid #35b558");
        })
        $(this).mouseleave(function() {
            $(this).css("border", "1px solid #e4e4e4");

        });
    });
});


//图片滚动
(function() {
    var box = document.getElementById('box');
    var ul = box.getElementsByTagName('ul')[0];
    ul.innerHTML += ul.innerHTML;
    var li = ul.getElementsByTagName('li');
    var img = ul.getElementsByTagName('img');
    var l = li.length;
    var len = li.length / 2;
    var half = len / 2;
    var ico = document.getElementById('ico').getElementsByTagName('a');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var li_w = 0;
    img[0].onload = function() {
        li_w = li[0].offsetWidth;
    }
    var timer = null;
    var now = 0;

    function auto() {
        next.onclick();
    }
    timer = setInterval(auto, 3000);

    prev.onclick = function() {
        if (now > 0) {
            now--;
        } else {
            now = len - 1;
            ul.style.left = -(li_w * len) + 'px';
        }
        scroll();
    }
    next.onclick = function() {
        if (now < l - 1) {
            now++;
        } else {
            now = len;
            ul.style.left = -(li_w * (len - 1)) + 'px';

        }
        scroll();
    }

    box.onmouseover = function() {
        clearInterval(timer);
    }
    box.onmouseout = function() {
        timer = setInterval(auto, 3000);
    }

    function scroll() {
        act(ul, 'left', -li_w * (now));
        tab();
    }

    function tab() {
        for (var i = 0; i < ico.length; i++) {
            ico[i].className = '';
        }
        ico[now % 5].className = 'active';
    }

    function css(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    }

    function act(obj, attr, target, fn) {
        obj.timer && clearInterval(obj.timer);

        obj.timer = setInterval(function() {
            var stop = true;
            var cur = parseInt(css(obj, attr));
            var speed = (target - cur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (cur != target) {
                stop = false;
                obj.style[attr] = cur + speed + 'px';
            }

            if (stop) {
                clearInterval(obj.timer);
                obj.timer = null;
                fn && fn();
            }
        }, 30);
    }

    function loadImage(url, callback) {
        var img = new Image(); //创建一个Image对象，实现图片的预下载
        img.src = url;

        if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
            callback.call(img);
            return; // 直接返回，不用再处理onload事件
        }
        img.onload = function() { //图片下载完毕时异步调用callback函数。
            callback.call(img); //将回调函数的this替换为Image对象
        };
    };
}());
