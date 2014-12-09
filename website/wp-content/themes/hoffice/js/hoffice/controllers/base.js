CBR.Controllers.Base = P(function (c) {
    c.init = function (options) {
        this.options = options;
    };

    c.initElements = function () {
        this.$html = $("html");
        this.$headerMenu = $("#header-menu");

        $("#content-header").height(window.innerHeight);
        $("#page").show();
    };

    c.initEvents = function () {
        $(".site-branding").children("button").click($.proxy(this._toggleHeaderMenu, this));

        $("#scroll-to-content").click(function(e) {
            var scrollYPos = $(".hoffice-page-content").offset().top;
            e.preventDefault();
            TweenLite.to(window, 0.3, {scrollTo: scrollYPos, ease:Power1.easeIn});
        });
    };

    c._toggleHeaderMenu = function() {
        if(this.$headerMenu.is(":visible")) {
            this.$headerMenu.hide();
            this.$html.removeClass("header-menu-open");
        } else {
            this.$headerMenu.show();
            this.$html.addClass("header-menu-open");
        }
    };
});