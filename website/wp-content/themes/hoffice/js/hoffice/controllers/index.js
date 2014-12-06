CBR.Controllers.Index = P(CBR.Controllers.Base, function (c, base) {
    c.run = function () {
        this._initElements();
        this._initEvents();

        this._verticallyCenterTextInMainMenu();
        this._resizeAndShowVideos();
    };

    c._initElements = function () {
        base.initElements();

        this.$mainMenuSpanContainers = $("#menu-main-menu").find("a").children("div");
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

        this.$videoArticles.show();
    };
});
