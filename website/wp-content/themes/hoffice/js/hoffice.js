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
;CBR.Controllers.Base = P(function (c) {
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
});;CBR.Controllers.Index = P(CBR.Controllers.Base, function (c, base) {
    c.run = function () {
        this._initElements();
        this._initEvents();

        this._resizeAndShowVideos();
    };

    c._initElements = function () {
        base.initElements();

        this.$videoArticles = $("article.format-video");
        this.$videoIframes = this.$videoArticles.find("iframe");
    };

    c._initEvents = function () {
        base.initEvents();
    };

    c._resizeAndShowVideos = function() {
        var width = 292;
        var height = 292 * 360 / 640;   // Original dimentions are 640 * 360

        this.$videoIframes.attr("width", width);
        this.$videoIframes.attr("height", height);

        this.$videoArticles.show();
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
