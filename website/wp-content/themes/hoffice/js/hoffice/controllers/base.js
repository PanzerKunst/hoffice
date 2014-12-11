CBR.Controllers.Base = P(function (c) {
    c.scrollTimer = null;
    c.headerBarOpacityDefault = 0.5;
    c.headerBarOpacityScrolledDown = 1;

    c.init = function (options) {
        this.options = options;
    };

    c.initElements = function () {
        this.$html = $("html");
        this.$headerBar = $(".site-branding");
        this.$headerMenu = $("#header-menu");

        $("#content-header").height(window.innerHeight);
        $("#page").show();
    };

    c.initEvents = function () {
        $(window).scroll(_.debounce($.proxy(this._toggleHeaderBarOpacity, this), 15));

        this.$headerBar.children("button").click($.proxy(this._toggleHeaderMenu, this));

        var headerBarHeight = this.$headerBar.height();

        $("#scroll-to-content").click(function (e) {
            e.preventDefault();

            var contentYPos = $(".hoffice-page-content").offset().top;
            var scrollYPos = contentYPos - headerBarHeight;
            TweenLite.to(window, 0.3, {scrollTo: scrollYPos, ease: Power1.easeIn});
        });
    };

    c._toggleHeaderBarOpacity = function (e, opacity) {
        this._listenForScrollEnd(e);
        var opacty = opacity ? opacity : this.headerBarOpacityScrolledDown;
        TweenLite.to(this.$headerBar, 0.5, {backgroundColor: "rgba(0, 0, 0, " + opacty + ")"});
    };

    c._listenForScrollEnd = function (e) {
        // This will start a timeout and wait 150ms. If a new scroll event occurred in the meantime, the timer is aborted
        // and a new one is created. If not, the function will be executed.
        if (this.scrollTimer !== null) {
            clearTimeout(this.scrollTimer);
        }
        this.scrollTimer = setTimeout(function () {
            if (window.pageYOffset === 0) {
                this._toggleHeaderBarOpacity(e, this.headerBarOpacityDefault);
            }
            clearTimeout(this.scrollTimer);
        }.bind(this), 150);
    };

    c._toggleHeaderMenu = function (e) {
        if (!this.$headerMenu.is(":visible")) {
            this.$headerMenu.show();
            this.$html.addClass("header-menu-open");
            this._addScrollbarWidthMargin();
            this.$headerBar.css("background-color", "black");

        } else {
            this.$headerMenu.hide();
            this.$html.removeClass("header-menu-open");
            this._removeScrollbarWidthMargin();
        }
    };

    c._addScrollbarWidthMargin = function() {
        var scrollbarWidth = CBR.Services.Browser.ScrollbarWidth.get();
        this.$headerBar.css("margin-right", scrollbarWidth);
        this.$headerMenu.css("margin-right", scrollbarWidth);
    };

    c._removeScrollbarWidthMargin = function() {
        this.$headerBar.css("margin-right", 0);
        this.$headerMenu.css("margin-right", 0);
    };
});
