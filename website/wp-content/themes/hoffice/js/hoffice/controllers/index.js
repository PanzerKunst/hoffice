CBR.Controllers.Index = P(CBR.Controllers.Base, function (c, base) {
    c.run = function () {
        this._initElements();
        this._initEvents();

        setTimeout($.proxy(this._verticallyCenterTextInMainMenu, this), 400);   // We need to wait a split second for the styling to be applied, before calculating heights
        this._resizeAndShowVideos();
    };

    c._initElements = function () {
        base.initElements();

        this.$mainMenuH2Containers = $("#index-menu-pages").find("aside");
        this.$videoArticles = $("article.format-video");
        this.$videoIframes = this.$videoArticles.find("iframe");
    };

    c._initEvents = function () {
        base.initEvents();
    };

    c._verticallyCenterTextInMainMenu = function() {
        this.$mainMenuH2Containers.each(function (index, element) {
            var $aside = $(element);
            var $h2 = $aside.children("h2");
            var paddingHeight = ($aside.height() - $h2.height()) / 2;
            $h2.css("padding-top", paddingHeight);
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
