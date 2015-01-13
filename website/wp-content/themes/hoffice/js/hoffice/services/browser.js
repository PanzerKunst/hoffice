CBR.Services.Browser = {
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
    })(),

    OS: (function () {
        return {
            isIOS: function () {
                return /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
            }
        }
    })(),

    Breakpoints: (function () {
        return {
            isMediumScreen: function() {
                var content = window.getComputedStyle(
                    document.querySelector("html"), ":after"
                ).getPropertyValue("content");

                // In some browsers like Firefox, "content" is wrapped by double-quotes, that's why doing "return content === "GLOBAL_MEDIUM_SCREEN_BREAKPOINT" would be false.
                return _.contains(content, "GLOBAL_MEDIUM_SCREEN_BREAKPOINT");
            },
            isLargeScreen: function() {
                var content = window.getComputedStyle(
                    document.querySelector("html"), ":after"
                ).getPropertyValue("content");

                return _.contains(content, "GLOBAL_LARGE_SCREEN_BREAKPOINT");
            },
            isSmallScreen: function () {
                return !this.isMediumScreen() && !this.isLargeScreen();
            }
        }
    })()
};
