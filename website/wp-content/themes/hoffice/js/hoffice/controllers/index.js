CBR.Controllers.Index = P(CBR.Controllers.Base, function (c, base) {
    c.animatedVisibleMenuItems = [];
    c.menuItemsToAnimateOnNextScroll = [];

    c.run = function () {
        this._initElements();
        this._initEvents();

        this._handleDisplayOfPostsMenu();
        this._initMagnificPopups();
    };

    c._initElements = function () {
        base.initElements();

        this.$menuItems = $(".index-menu-container").find("li");

        // TODO: remove this.$pagesMenuH2Containers = $("#index-menu-pages").find("aside");

        this.$postsMenu = $("#index-menu-posts");
        this.$postsMenuItems = this.$postsMenu.children("li");
        // TODO: remove this.$postsMenuTextContainers = this.$postsMenuItems.children(".entry-header");

        this.$videoArticles = $("li.format-video");
        this.$videoLinks = this.$videoArticles.children(".entry-content").find("a");

        this.$showMorePostsBtn = $("#show-more-posts");
    };

    c._initEvents = function () {
        base.initEvents();

        if (Modernizr.touch) {   // Because checking visibility outside viewport doesn't work in touch browsers
            this.$menuItems.each(function (index, element) {
                var $menuItem = $(element);

                this._animateMenuItem($menuItem);

                // For the sake of code logic; not really necessary
                this.animatedVisibleMenuItems.push($menuItem[0]);
            }.bind(this));
        } else {
            $(window).scroll(_.debounce($.proxy(this._animateMenuItemsVisible, this), 15));
        }

        this.$showMorePostsBtn.click($.proxy(this._showRemainingPosts, this));
    };

    c._animateMenuItemsVisible = function () {
        this.menuItemsToAnimateOnNextScroll.forEach(function ($menuItem, index) {
            if ($menuItem.visible()) {    // If fully visible
                // We animate the menu item after a split second
                setTimeout(function () {
                    this._animateMenuItem($menuItem);
                }.bind(this), 250);

                // We would move this line inside _animateTextBubble() if it wasn't for the 250ms delay
                this.animatedVisibleMenuItems.push($menuItem[0]);

                // The text bubble has been animated, we remove it from the array
                this.menuItemsToAnimateOnNextScroll.splice(index);
            }
        }.bind(this));

        this.$menuItems.each(function (index, element) {
            var $menuItem = $(element);

            if (!_.contains(this.animatedVisibleMenuItems, element)) {
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
        $textContainers.each(this._verticallyCenterInContainer);

        TweenLite.set($menuItem, {visibility: "visible", opacity: 0});
        TweenLite.to($menuItem, 0.3, {opacity: 1});
    };

    c._handleDisplayOfPostsMenu = function () {
        var postCount = this.$postsMenuItems.length;
        var maxIndex = postCount < 3 ? postCount : 3;

        for (var i = 0; i < maxIndex; i++) {
            this._showPost(this.$postsMenuItems[i]);
        }
    };

    /* TODO : remove
     c._verticallyCenterTextInPageAndPostMenus = function () {
     this.$pagesMenuH2Containers.each(this._verticallyCenterInContainer);
     this.$postsMenuTextContainers.each(this._verticallyCenterInContainer);
     }; */

    c._verticallyCenterInContainer = function (index, container) {
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
            }
            /* TODO else if (_.contains(url.toLowerCase(), "vimeo")) {
             } */
        });

        this.$videoArticles.css("display", "inline-block");
    };

    c._showPost = function ($li) {
        TweenLite.set($li, {display: "inline-block", opacity: 0});
        TweenLite.to($li, 4, {opacity: 1});
    };

    c._showRemainingPosts = function () {
        this.$postsMenuItems.each(function (index, element) {
            var $li = $(element);
            if ($li.css("display") === "none") {
                this._showPost($li);
            }
        }.bind(this));

        this.$showMorePostsBtn.hide();
    };
});
