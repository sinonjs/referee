if (typeof module == "object" && typeof require == "function") {
    var buster = require("buster-core");
    buster.assertions = require("../buster-assertions");
}

buster.assertions.that = function (object) {
    object.that = function (actual) {
        var asserter = buster.create(object.that.asserter);
        asserter.actual = actual;

        return asserter;
    };

    object.that.asserter = {};

    function buildAssertion(assertion) {
        object.that.asserter[assertion] = function () {
            var args = [this.actual].concat(Array.prototype.slice.call(arguments));
            return object[assertion].apply(object, args);
        };
    }

    for (var prop in object) {
        if (typeof object[prop] != "function") {
            continue;
        }

        buildAssertion(prop);
    }
};

if (typeof module == "object") {
    module.exports = buster.assertions.that;
}
