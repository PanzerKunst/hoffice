CBR.Controllers.Index = P(CBR.Controllers.Base, function (c, base) {
    c.run = function () {
        this._initElements();
        this._initEvents();

        setTimeout($.proxy(this._verticallyCenterTextInPageAndPostMenus, this), 400);   // We need to wait a split second for the styling to be applied, before calculating heights
        this._initMagnificPopups();
    };

    c._initElements = function () {
        base.initElements();

        this.$pagesMenuH2Containers = $("#index-menu-pages").find("aside");
        this.$postsMenuTextContainers = $("#index-menu-posts").find(".entry-header");
        this.$videoArticles = $("li.format-video");
        this.$videoLinks = this.$videoArticles.children(".entry-content").find("a");
    };

    c._initEvents = function () {
        base.initEvents();

        $(window).resize(_.debounce($.proxy(this._verticallyCenterTextInPageAndPostMenus, this), 50));
    };

    c._verticallyCenterTextInPageAndPostMenus = function () {
        this.$pagesMenuH2Containers.each(this._vertivallyCenterInContainer);
        this.$postsMenuTextContainers.each(this._vertivallyCenterInContainer);
    };

    c._vertivallyCenterInContainer = function(index, container) {
        var $container = $(container);
        var $child = $container.children(":first-child");
        var paddingHeight = ($container.height() - $child.height()) / 2;
        $child.css("padding-top", paddingHeight);
    };

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
                $a.html('<img src="http://img.youtube.com/vi/' + videoId + '/hqdefault.jpg"/>');
            } /* TODO else if (_.contains(url.toLowerCase(), "vimeo")) {
            } */
        });

        this.$videoArticles.css("display", "inline-block");
    };
});
