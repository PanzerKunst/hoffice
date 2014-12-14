CBR.Controllers.Index = P(CBR.Controllers.Base, function (c, base) {
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
