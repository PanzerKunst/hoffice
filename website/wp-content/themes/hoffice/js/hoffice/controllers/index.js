CBR.Controllers.Index = P(CBR.Controllers.Base, function (c, base) {
    c.animatedVisibleMenuItems = [];
    c.menuItemsToAnimateOnNextScroll = [];

    c.run = function () {
        this._initElements();
        this._initEvents();

        this._displayFirstTreePagesMenu();
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

        this.$menuItemsToAnimateOnScroll = $(this.$pagesMenuItems.toArray().concat(this.$recentPostsMenuItems.toArray()));
    };

    c._initEvents = function () {
        base.initEvents();

        if (Modernizr.touch) {   // Because checking visibility outside viewport doesn't work in touch browsers
            this.$menuItemsToAnimateOnScroll.each(function (index, element) {
                var $menuItem = $(element);
                this._animateMenuItem($menuItem);

                // For the sake of code logic; not really necessary
                this.animatedVisibleMenuItems.push($menuItem[0]);
            }.bind(this));
        } else {
            $(window).scroll(_.debounce($.proxy(this._animateVisibleMenuItems, this), 15));
        }

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

    c._displayFirstTreePagesMenu = function () {
        // On touch browsers, no need, because everything will be displayed immediately anyway
        if (!Modernizr.touch) {
            var maxIndex = this.$pagesMenuItems.length;
            if (maxIndex > 3) {
                maxIndex = 3
            }

            for (var i = 0; i < maxIndex; i++) {
                var element = this.$pagesMenuItems[i];
                this._animateMenuItem($(element));
                this.animatedVisibleMenuItems.push(element);
            }
        }
    };

    c._animateVisibleMenuItems = function () {
        // We need to clone otherwise we splice an array that we are traversing
        this.menuItemsToAnimateOnNextScroll.clone().forEach(function ($menuItem, index) {
            // We animate the text bubble after a split second
            setTimeout(function () {
                this._animateMenuItem($menuItem);
            }.bind(this), 250);

            // We would move this line inside _animateTextBubble() if it wasn't for the 250ms delay
            this.animatedVisibleMenuItems.push($menuItem[0]);

            // The text bubble has been animated, we remove it from the array
            this.menuItemsToAnimateOnNextScroll.splice(index);
        }.bind(this));

        this.$menuItemsToAnimateOnScroll.each(function (index, element) {
            var $menuItem = $(element);

            if (!_.contains(this.animatedVisibleMenuItems, element) && $menuItem.visible(true)) {   // If partially visible
                // We store the element it one to be animated on next scroll
                this.menuItemsToAnimateOnNextScroll.push($menuItem);
            }
        }.bind(this));
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

    c._showRemainingPosts = function () {
        this.$oldPostsMenuItems.each(function (index, element) {
            this._animateMenuItem($(element));
            this.animatedVisibleMenuItems.push(element);
        }.bind(this));

        this.$showMorePostsBtn.hide();
    };
});
