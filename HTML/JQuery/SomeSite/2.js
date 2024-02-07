(function ($) {
    $.fn.extend({
        //插件名称 - paddingList
        paddingList: function (options) {

            //参数和默认值
            var defaults = {
                animatePadding: 10,
                hoverColor: "Black"
            };

            var options = $.extend(defaults, options);

            return this.each(function () {
                var o = options;

                //将元素集合赋给变量 本例中是 ul对象 
                var obj = $(this);

                //得到ul中的a对象
                var items = $("li a", obj);

                //添加hover()事件到a
                items.hover(function () {
                    $(this).css("color", o.hoverColor);
                    //queue false表示不添加到动画队列中
                    $(this).animate({ paddingLeft: o.animatePadding }, { queue: false, duration: 300 });

                }, function () {
                    $(this).css("color", "");
                    $(this).animate({ paddingLeft: "0" }, { queue: true, duration: 300 });
                });

            });
        },
        Sayhello: function (options) {

            this.click(function (event) {
                /* Act on the event */
                console.log("say hello called.");
            });

        },
        addcontent: function (options) {
            this.load('http://localhost:9999/1.html',
                function () {
                    /* Stuff to do after the page is loaded */
                });
            $("#div123").click(function (event) {
                /* Act on the event */
                alert("this is div123 clicked");
            });

            this.click(function (event) {
                /* Act on the event */

                console.log("say hello called.");
                $("#div123").html("hehe.................");
            });


        }
    });
})(jQuery);
