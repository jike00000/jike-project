$(document).ready(function() {
    $(window).on("load", function() {
        imgLocation();
        //设置滚动时加载的json数据
        var dataImg = {
                "data": [{
                    "src": "1.jpg"
                }, {
                    "src": "2.jpg"
                }, {
                    "src": "3.jpg"
                }, {
                    "src": "4.jpg"
                }, {
                    "src": "5.jpg"
                }, {
                    "src": "6.jpg"
                }, {
                    "src": "7.jpg"
                }, {
                    "src": "8.jpg"
                }, {
                    "src": "9.jpg"
                }, {
                    "src": "10.jpg"
                }, {
                    "src": "11.jpg"
                }, {
                    "src": "12.jpg"
                }]
            }
        //监听鼠标滚动事件
        window.onscroll = function() {
            if (scrollSide()) {
                $.each(dataImg.data, function(index, value) {
                    var box = $("<div>").addClass("box").appendTo($(".container"));
                    var content = $("<div>").addClass("content").appendTo(box);
                    $("<img>").attr("src", "./img/" + $(value).attr("src")).appendTo(content);
                });
                imgLocation();
            }
        };
        //当窗口大小改变时重新调整位置
        window.onresize = function() {
            imgLocation();
        };
    });
});

//图片盒子位置定位
function imgLocation() {
    var box = $(".box");
    var boxWidth = box.eq(0).width();
    var num = Math.floor($(window).width() / boxWidth);
    //设置容器宽度
    $(".container").width(boxWidth * num).css("margin", "0 auto");
    //用来放每行盒子的宽度
    var boxArr = [];
    box.each(function(index, value) {
        // console.log(index + "--" + value);
        var boxHeight = box.eq(index).height();
        //重置每个盒子的position
        $(value).css({
            "position": "static"
        });
        if (index < num) {
            boxArr[index] = boxHeight;
            // console.log(boxHeight);
        } else {
            var minBoxHeight = Math.min.apply(null, boxArr);

            var minBoxIndex = $.inArray(minBoxHeight, boxArr);
            //设定下一行第一个盒子的position
            $(value).css({
                "position": "absolute",
                "top": minBoxHeight,
                "left": box.eq(minBoxIndex).position().left
            });
            boxArr[minBoxIndex] += box.eq(index).height();
        }
    });
}

//设置滑动
function scrollSide() {
    var box = $(".box");
    var lastboxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height() / 2);
    var documentHeight = $(window).height();
    var scrollHeight = $(window).scrollTop();
    //根据最后一个盒子离顶部的高度返回真或假
    return (lastboxHeight < scrollHeight + documentHeight) ? true : false;
}
