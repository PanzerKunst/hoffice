CBR.Controllers.PostAndPage = P(CBR.Controllers.Base, function (c, base) {
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
