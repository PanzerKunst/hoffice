CBR.Controllers.Base = P(function (c) {
    c.init = function (options) {
        this.options = options;
    };

    c.initElements = function () {
        $("#content-header").height(window.innerHeight);
        $("#page").show();
    };

    c.initEvents = function () {
        $("#scroll-to-content").click(function(e) {
            var scrollYPos = $(".hoffice-page-content").offset().top;
            e.preventDefault();
            TweenLite.to(window, 0.3, {scrollTo: scrollYPos, ease:Power1.easeIn});
        });
    };
});