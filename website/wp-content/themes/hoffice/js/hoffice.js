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
    scrollbarWidth: (function () {
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
        var scrollbarWidth = CBR.Services.Browser.scrollbarWidth.get();
        this.$headerBar.css("margin-right", scrollbarWidth);
        this.$headerMenu.css("margin-right", scrollbarWidth);
    };

    c._removeScrollbarWidthMargin = function() {
        this.$headerBar.css("margin-right", 0);
        this.$headerMenu.css("margin-right", 0);
    };
});
;CBR.Controllers.Index = P(CBR.Controllers.Base, function (c, base) {
    c.run = function () {
        this._initElements();
        this._initEvents();

        this._verticallyCenterTextInMainMenu();
        this._resizeAndShowVideos();
    };

    c._initElements = function () {
        base.initElements();

        this.$mainMenuSpanContainers = $("#index-menu-pages").find("a").children("div");
        this.$videoArticles = $("article.format-video");
        this.$videoIframes = this.$videoArticles.find("iframe");
    };

    c._initEvents = function () {
        base.initEvents();
    };

    c._verticallyCenterTextInMainMenu = function() {
        this.$mainMenuSpanContainers.each(function (index, element) {
            var $div = $(element);
            var $span = $div.children();
            var paddingHeight = ($div.height() - $span.height()) / 2;
            $span.css("padding-top", paddingHeight);
        });
    };

    c._resizeAndShowVideos = function() {
        var width = 292;
        var height = 292 * 360 / 640;   // Original dimentions are 640 * 360

        this.$videoIframes.attr("width", width);
        this.$videoIframes.attr("height", height);

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
