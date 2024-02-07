(function ($) {

    var _inited = false;

    this.showhello = function (options) {
        alert("show hello");
    }

    this.RegistertoOA = function () {

    }


    var $cutter = (function () {
        var inited = false;
        return {
            init: function () {
                if (inited) return;
            }
        };
    })();

})(jQuery);
