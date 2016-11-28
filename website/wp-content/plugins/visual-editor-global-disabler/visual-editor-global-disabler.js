document.addEventListener("DOMContentLoaded", function () {
    var _removeTabButton = function() {
        var tabButton = document.getElementById("content-tmce");

        if (tabButton) {
            tabButton.parentNode.removeChild(tabButton);
        }
    }
    
    var activeClassEl = document.getElementById("wp-content-wrap");
    
    if (activeClassEl) {
        // If it's the visual editor which is currently active, we don't do anything
        var isToRemoveTabButton = false;

        var classNameToCheckForPresence = "html-active";
        if (activeClassEl.classList) { // Browser supports "classList"
            if (activeClassEl.classList.contains(classNameToCheckForPresence)) {
                isToRemoveTabButton = true;
            }
        } else { // Browser does not support "classList"
            if ((' ' + activeClassEl.className + ' ').indexOf(' ' + classNameToCheckForPresence + ' ') > -1) {
                isToRemoveTabButton = true;
            }
        }

        if (isToRemoveTabButton) {
            _removeTabButton();
        }
    }
});
