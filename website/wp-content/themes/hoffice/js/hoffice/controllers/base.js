CBR.Controllers.Base = P(function (c) {
    c.scrollTimer = null;

    c.DIFFERENCE_BETWEEN_HOME_LINK_LEFT_MARGIN_AND_MENU_BUTTON_RIGHT_MARGIN = 5;

    c.HEADER_BAR_DARK_MODE = 0;
    c.HEADER_BAR_WHITE_MODE = 1;
    c.headerBarMode = c.HEADER_BAR_DARK_MODE;

    c.init = function (options) {
        this.options = options;
    };

    c.saveInLocalStorage = function (key, value) {
        if (Modernizr.localstorage) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    };

    c.getFromLocalStorage = function (key) {
        if (Modernizr.localstorage) {
            return JSON.parse(localStorage.getItem(key));
        }
    };

    c.removeFromLocalStorage = function (key) {
        if (Modernizr.localstorage) {
            localStorage.removeItem(key);
        }
    };

    c.initElements = function () {
        this.$window = $(window);
        this.$html = $("html");

        this.$headerBar = $(".site-branding");
        this.$homeLink = this.$headerBar.find('a[rel="home"]');
        this.$menuButton = this.$headerBar.find(".styleless");
        this.$polylangWidget = this.$headerBar.find(".widget_polylang");
        this.$swedishLanguageLink = this.$polylangWidget.find('a[hreflang="sv"]');
        this.$englishLanguageLink = this.$polylangWidget.find('a[hreflang="en"]');

        this.$headerMenu = $("#header-menu");
        this.$headerMenuSections = this.$headerMenu.children();
        this.$content = $("#content");
        this.$contentHeader = $("#content-header");

        this._addIOSClass();
        this._initHeaderLanguageLinks();
        this._initContentHeaderHeight();
        $("#page").show();

        this.windowWidth = this.$window.width();
    };

    c.initEvents = function () {
        this.$window.resize(_.debounce(function(e) {
            var windowWidth = this.$window.width();

            // Because Android triggers window resize on scroll
            if (this.windowWidth !== windowWidth) {
                this._initHeaderLanguageLinks(e);
                this._initContentHeaderHeight(e);

                this.windowWidth = windowWidth;
            }
        }.bind(this), 15));

        // Disabled on touch browsers - doesn't look good enough
        if (!Modernizr.touch) {
            this.$window.scroll(_.debounce($.proxy(this._checkHeaderBackground, this), 15));
        }

        this.$headerBar.find("button").click($.proxy(this._toggleHeaderMenu, this));
    };

    c._addIOSClass = function() {
        if (CBR.Services.Browser.OS.isIOS()) {
            this.$html.addClass("ios");
        }
    };

    c._initHeaderLanguageLinks = function(e) {
        // We need a very short timeout before centering the links, because for a split second this.$homeLink.width() is zero on load
        setTimeout(function() {
            this._centerLanguageLinks();

            if (CBR.Services.Browser.Breakpoints.isSmallScreen()) {
                this.$swedishLanguageLink.html("sv");
                this.$englishLanguageLink.html("en");
            } else {
                this.$swedishLanguageLink.html("Svenska");
                this.$englishLanguageLink.html("English");
            }
        }.bind(this), 50);
    };

    c._centerLanguageLinks = function() {
        this.$polylangWidget.css("margin-left", this.$menuButton.width() - this.$homeLink.width() - this.DIFFERENCE_BETWEEN_HOME_LINK_LEFT_MARGIN_AND_MENU_BUTTON_RIGHT_MARGIN);
    };

    c._initContentHeaderHeight = function(e) {
        this.contentHeaderHeight = window.innerHeight * 3 / 4;
        this.$contentHeader.height(this.contentHeaderHeight);
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
