CBR.Controllers.Base = P(function (c) {
    c.scrollTimer = null;
    c.contentHeaderHeight = window.innerHeight * 3 / 4;

    c.HEADER_BAR_DARK_MODE = 0;
    c.HEADER_BAR_WHITE_MODE = 1;
    c.headerBarMode = c.HEADER_BAR_DARK_MODE;

    c.init = function (options) {
        this.options = options;
    };

    c.initElements = function () {
        this.$html = $("html");
        this.$headerBar = $(".site-branding");
        this.$headerMenu = $("#header-menu");
        this.$headerMenuSections = this.$headerMenu.children();
        this.$content = $("#content");

        $("#content-header").height(this.contentHeaderHeight);
        $("#page").show();
    };

    c.initEvents = function () {
        $(window).scroll(_.debounce($.proxy(this._checkHeaderBackground, this), 15));

        this.$headerBar.children("button").click($.proxy(this._toggleHeaderMenu, this));

        /* TODO: remove
        var headerBarHeight = this.$headerBar.height();

        $("#scroll-to-content").click(function (e) {
            e.preventDefault();

            var contentYPos = $(".hoffice-page-content").offset().top;
            var scrollYPos = contentYPos - headerBarHeight;
            TweenLite.to(window, 0.3, {scrollTo: scrollYPos, ease: Power1.easeIn});
        }); */
    };

    c._checkHeaderBackground = function(e) {
        if (window.pageYOffset < (this.contentHeaderHeight - this.$headerBar.height())
            && this.headerBarMode === this.HEADER_BAR_WHITE_MODE) {
            this._setHeaderBarBackgroundMode(this.HEADER_BAR_DARK_MODE);
        } else if (window.pageYOffset >= (this.contentHeaderHeight - this.$headerBar.height())
            && this.headerBarMode === this.HEADER_BAR_DARK_MODE) {
            this._setHeaderBarBackgroundMode(this.HEADER_BAR_WHITE_MODE);
        }
    };

    c._setHeaderBarBackgroundMode = function (mode) {
        if (mode === this.HEADER_BAR_DARK_MODE) {
            this.$html.removeClass("scrolled-down");
        } else {
            this.$html.addClass("scrolled-down");
        }
        this.headerBarMode = mode;
    };

    c._toggleHeaderMenu = function (e) {
        if (!this.$html.hasClass("header-menu-open")) {
            this.$headerBar.addClass("header-menu-open");

            TweenLite.set(this.$headerMenu, {transformOrigin: "left " + this.$headerBar.height() + "px 0", skewX: "-90deg", zIndex: 10});
            TweenLite.to(this.$headerMenu, 0.4, {skewX: "0deg", onComplete: function () {
                this.$html.addClass("header-menu-open");
                this._addScrollbarWidthMargin();
                TweenLite.to(this.$headerMenuSections, 0.4, {opacity: 1});
                this.$headerMenu.css("overflow", "auto");
                this.$content.css("visibility", "hidden");  // .hide() is worse performance
            }.bind(this)});
        } else {
            // We want the menu to be scrolled back to top the next time it opens. Doesn't work when menu is hidden
            this.$headerMenu.scrollTop(0);

            this.$headerBar.removeClass("header-menu-open");

            this.$html.removeClass("header-menu-open");
            this._removeScrollbarWidthMargin();
            this.$headerMenuSections.css("opacity", 0);
            this.$headerMenu.css("overflow", "visible");
            this.$content.css("visibility", "visible");

            TweenLite.to(this.$headerMenu, 0.4, {opacity: 0, onComplete: function () {
                TweenLite.set(this.$headerMenu, {opacity: 1, zIndex: -1});
            }.bind(this)});
        }
    };

    c._addScrollbarWidthMargin = function () {
        var scrollbarWidth = CBR.Services.Browser.ScrollbarWidth.get();
        this.$headerBar.css("margin-right", scrollbarWidth);
        this.$headerMenu.css("margin-right", scrollbarWidth);
    };

    c._removeScrollbarWidthMargin = function () {
        this.$headerBar.css("margin-right", 0);
        this.$headerMenu.css("margin-right", 0);
    };
});
