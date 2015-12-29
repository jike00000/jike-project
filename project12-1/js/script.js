var index = {
    init: function(argument) { //初始化
        this.render();
        this.bind();
    },
    render: function() {
        //将jquery对象赋值给index对象上的变量
        this.morebtn = $(".s_bri");
        this.window = $(window);
        this.body = $('body');
        this.morediv = $(".bdbri");
        this.top = $(".to-top");
        this.newswrapper = $(".news-wrapper");
        this.newsrank = $(".news-rank");
        this.menu = $(".menu_container .m");
    },
    bind: function() {
        var me = this;
        /**
         * 侧边栏切换
         */
        me.morebtn.mouseenter(function() {
            wH = me.window.height();
            me.morediv.fadeIn(300);
            me.morediv.css("height", wH);
        });
        me.morediv.mouseleave(function() {
            me.morediv.fadeOut(300);
        });
        /**
         * 屏幕滚动事件
         */
        me.window.scroll(function() {
            var scrollHeight = me.window.scrollTop();
            //当屏幕向下滚动时
            if (scrollHeight > 0) {
                me.top.show(); //向上按钮显示
                me.newswrapper.each(function(index) {
                    var content = me.newswrapper.eq(index).find(".news-item").eq(0);
                    me.newswrapper.eq(index).append(content.clone());
                }); //滚动加载
            } else {
                me.top.hide();
            }
            //当屏幕滚动高度大于370时，改变css
            if (scrollHeight > 370) {
                me.newsrank.css({
                    "position": "absolute",
                    "top": scrollHeight - 370 + "px",
                    "right": "-21px"
                });
            } else if (scrollHeight <= 370) {
                me.newsrank.css({
                    "position": "absolute",
                    "top": "0px",
                    "right": "-21px"
                });
            }
        });

        /**
         * 页面跳转顶部
         */
        me.top.click(function() {
            me.body.animate({
                scrollTop: 0
            }, 500);
            return false;
        });
        /**
         * tab栏切换
         */
        me.menu.each(function(index) {
            var tabOn = $(this);
            $(this).click(function() {
                $(".menu_container .tabin").removeClass("tabin");
                $(".s_contents .contentin").removeClass("contentin");
                $(".s_contents>div").eq(index).addClass("contentin");
                tabOn.addClass("tabin");
            })
        });

        /**
         * 添加内容
         */
        me.newswrapper.each(function(index) {
            var content = me.newswrapper.eq(index).find(".news-item");
            var item = $(".news-rank-content li").eq(0);
            for (var i = 0; i < 1; i++) {
                me.newswrapper.eq(index).append(content.clone());
            }
            for (var i = 0; i < 11; i++) {
                $(".news-rank-content").eq(index).append(item.clone());
            }
        });
    }
};


index.init();
