var P = (function(prototype, ownProperty, undefined) {
  return function P(_superclass /* = Object */, definition) {
    // handle the case where no superclass is given
    if (definition === undefined) {
      definition = _superclass;
      _superclass = Object;
    }

    // C is the class to be returned.
    //
    // When called, creates and initializes an instance of C, unless
    // `this` is already an instance of C, then just initializes `this`;
    // either way, returns the instance of C that was initialized.
    //
    //  TODO: the Chrome inspector shows all created objects as `C`
    //        rather than `Object`.  Setting the .name property seems to
    //        have no effect.  Is there a way to override this behavior?
    function C() {
      var self = this instanceof C ? this : new Bare;
      self.init.apply(self, arguments);
      return self;
    }

    // C.Bare is a class with a noop constructor.  Its prototype will be
    // the same as C, so that instances of C.Bare are instances of C.
    // `new MyClass.Bare` then creates new instances of C without
    // calling .init().
    function Bare() {}
    C.Bare = Bare;

    // Extend the prototype chain: first use Bare to create an
    // uninitialized instance of the superclass, then set up Bare
    // to create instances of this class.
    var _super = Bare[prototype] = _superclass[prototype];
    var proto = Bare[prototype] = C[prototype] = C.p = new Bare;

    // pre-declaring the iteration variable for the loop below to save
    // a `var` keyword after minification
    var key;

    // set the constructor property on the prototype, for convenience
    proto.constructor = C;

    C.extend = function(def) { return P(C, def); }

    return (C.open = function(def) {
      if (typeof def === 'function') {
        // call the defining function with all the arguments you need
        // extensions captures the return value.
        def = def.call(C, proto, _super, C, _superclass);
      }

      // ...and extend it
      if (typeof def === 'object') {
        for (key in def) {
          if (ownProperty.call(def, key)) {
            proto[key] = def[key];
          }
        }
      }

      // if no init, assume we're inheriting from a non-Pjs class, so
      // default to using the superclass constructor.
      if (!('init' in proto)) proto.init = _superclass;

      return C;
    })(definition);
  }

  // as a minifier optimization, we've closured in a few helper functions
  // and the string 'prototype' (C[p] is much shorter than C.prototype)
})('prototype', ({}).hasOwnProperty);
;if (typeof String.prototype.startsWith !== 'function') {
    String.prototype.startsWith = function (str) {
        return this.slice(0, str.length) === str;
    };
}

// create the base namespace
var CBR = CBR || {};

// create additional namespace
CBR.Controllers = CBR.Controllers || {};
CBR.Services = CBR.Services || {};
;CBR.Services.Browser = {
    ScrollbarWidth: (function () {
        var _scrollbarWidth = null;

        function _getScrollarWidth() {
            var outer = document.createElement("div");
            outer.style.visibility = "hidden";
            outer.style.width = "100px";
            outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

            document.body.appendChild(outer);

            var widthNoScroll = outer.offsetWidth;
            // force scrollbars
            outer.style.overflow = "scroll";

            // add innerdiv
            var inner = document.createElement("div");
            inner.style.width = "100%";
            outer.appendChild(inner);

            var widthWithScroll = inner.offsetWidth;

            // remove divs
            outer.parentNode.removeChild(outer);

            return widthNoScroll - widthWithScroll;
        }

        return {
            get: function () {
                if (_scrollbarWidth === null) {
                    _scrollbarWidth = _getScrollarWidth();
                }
                return _scrollbarWidth;
            }
        }
    })()
};
;CBR.Controllers.Base = P(function (c) {
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
                // TODO this.$content.css("visibility", "hidden");  // .hide() is worse performance
            }.bind(this)});
        } else {
            // We want the menu to be scrolled back to top the next time it opens. Doesn't work when menu is hidden
            this.$headerMenu.scrollTop(0);

            this.$headerBar.removeClass("header-menu-open");

            this.$html.removeClass("header-menu-open");
            this._removeScrollbarWidthMargin();
            this.$headerMenuSections.css("opacity", 0);
            this.$headerMenu.css("overflow", "visible");
            // TODO this.$content.css("visibility", "visible");

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
;CBR.Controllers.Index = P(CBR.Controllers.Base, function (c, base) {
    c.run = function () {
        this._initElements();
        this._initEvents();

        setTimeout($.proxy(this._verticallyCenterTextInMainMenu, this), 400);   // We need to wait a split second for the styling to be applied, before calculating heights
        // TODO: remove this._resizeAndShowVideos();
        this._initMagnificPopups();
    };

    c._initElements = function () {
        base.initElements();

        this.$mainMenuH2Containers = $("#index-menu-pages").find("aside");
        this.$videoArticles = $("li.format-video");
        // TODO: removethis.$videoIframes = this.$videoArticles.find("iframe");
        this.$videoLinks = this.$videoArticles.children(".entry-content").find("a");
    };

    c._initEvents = function () {
        base.initEvents();

        $(window).resize(_.debounce($.proxy(this._verticallyCenterTextInMainMenu, this), 50));
    };

    c._verticallyCenterTextInMainMenu = function () {
        this.$mainMenuH2Containers.each(function (index, element) {
            var $aside = $(element);
            var $h2 = $aside.children("h2");
            var paddingHeight = ($aside.height() - $h2.height()) / 2;
            $h2.css("padding-top", paddingHeight);
        });
    };

    /* TODO: remove
     c._resizeAndShowVideos = function() {
     var width = 292;
     var height = 292 * 360 / 640;   // Original dimentions are 640 * 360

     this.$videoIframes.attr("width", width);
     this.$videoIframes.attr("height", height);

     this.$videoArticles.css("display", "inline-block");
     }; */

    c._initMagnificPopups = function () {
        this.$videoLinks.each(function (index, element) {
            var $a = $(element);
            var url = $a.attr("href");

            $a.magnificPopup({
                type: 'iframe',
                src: url
            });

            if (_.contains(url.toLowerCase(), "youtube")) {
                var separator = "?v=";
                var videoId = url.substring(url.indexOf(separator) + separator.length);
                $a.html('<div class="menu-item-overlay"></div><img src="http://img.youtube.com/vi/' + videoId + '/hqdefault.jpg"/>');
            } else if (_.contains(url.toLowerCase(), "vimeo")) {
            }
        });

        this.$videoArticles.css("display", "inline-block");
    };
});
;CBR.Controllers.PostAndPage = P(CBR.Controllers.Base, function (c, base) {
    c.run = function () {
        this._initElements();
        this._initEvents();
    };

    c._initElements = function () {
        base.initElements();
    };

    c._initEvents = function () {
        base.initEvents();
    };
});
