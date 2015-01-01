CBR.Controllers.Index = P(CBR.Controllers.Base, function (c, base) {
    c.localStorageKey_showMorePostsBtnClicked = 1;

    c.run = function () {
        this._initElements();
        this._initEvents();

        this._displayMenuItems();
        this._removeTransitionsOfMenuItemTextBackgroundOnTouchBrowsers();
        this._initMagnificPopups();
    };

    c._initElements = function () {
        base.initElements();

        this.$menuContainer = $(".index-menu-container");

        this.$pagesMenu = $("#index-menu-pages");
        this.$pagesMenuItems = this.$pagesMenu.children("li");

        this.$postsMenu = $("#index-menu-posts");
        this.$postsMenuItems = this.$postsMenu.children("li");

        this.$videoArticles = $("li.format-video");
        this.$videoLinks = this.$videoArticles.children(".entry-content").find("a");

        this.$showMorePostsBtn = $("#show-more-posts");

        this._hidePostsOlderThanFirstThree();

        this.$recentPostsMenuItems = this.$postsMenuItems.filter(":visible");
        this.$oldPostsMenuItems = $(_.difference(this.$postsMenuItems.toArray(), this.$recentPostsMenuItems.toArray()));

        this.$menuItemsExceptOldPosts = $(this.$pagesMenuItems.toArray().concat(this.$recentPostsMenuItems.toArray()));
    };

    c._initEvents = function () {
        base.initEvents();

        this.$showMorePostsBtn.click($.proxy(this._showRemainingPosts, this));
    };

    c._hidePostsOlderThanFirstThree = function () {
        var postCount = this.$postsMenuItems.length;

        if (postCount > 3) {
            for (var i = 3; i < postCount; i++) {
                $(this.$postsMenuItems[i]).hide();
            }
        }
    };

    c._displayMenuItems = function () {
        this.$menuItemsExceptOldPosts.each(function (index, element) {
            var $menuItem = $(element);
            this._animateMenuItem($menuItem);
        }.bind(this));

        if (this.getFromLocalStorage(this.localStorageKey_showMorePostsBtnClicked)) {
            this._showRemainingPosts();
        }
    };

    c._animateMenuItem = function ($menuItem) {
        var $textContainers = null;
        if ($menuItem.parent().attr("id") === "index-menu-pages") {
            $textContainers = $menuItem.find("aside");
        } else {
            $textContainers = $menuItem.children(".entry-header");
        }

        // For calculations to be possible, items must be visible
        $menuItem.css("display", "inline-block");

        $textContainers.each(this._verticallyCenterInContainer);

        TweenLite.set($menuItem, {opacity: 0, visibility: "visible"});
        TweenLite.to($menuItem, 1, {opacity: 1});
    };

    c._verticallyCenterInContainer = function (index, container) {
        var $container = $(container);
        var $child = $container.children(":first-child");
        var paddingHeight = ($container.height() - $child.height()) / 2;
        $child.css("padding-top", paddingHeight);
    };

    c._removeTransitionsOfMenuItemTextBackgroundOnTouchBrowsers = function () {
        if (Modernizr.touch) {
            this.$menuContainer.find(".menu-item-overlay").addClass("no-transiton");
            this.$menuContainer.find("h2").addClass("no-transiton");
            this.$postsMenu.find("a").addClass("no-transiton");
            this.$postsMenu.find("time").addClass("no-transiton");
            this.$postsMenu.find(".byline").addClass("no-transiton");
        }
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
            }
            /* TODO else if (_.contains(url.toLowerCase(), "vimeo")) {
             } */
        });

        this.$videoArticles.css("display", "inline-block");
    };

    c._showRemainingPosts = function (e) {
        this.$oldPostsMenuItems.each(function (index, element) {
            this._animateMenuItem($(element));
        }.bind(this));

        // We don't want to scrollTo if this function was called from this._displayMenuItems()
        if (e) {
            var scrollYPos = $(this.$oldPostsMenuItems[0]).offset().top;
            TweenLite.to(window, 0.3, {scrollTo: scrollYPos, ease:Power1.easeIn});
        }

        this.$showMorePostsBtn.hide();

        this.saveInLocalStorage(this.localStorageKey_showMorePostsBtnClicked, true);
    };
});
