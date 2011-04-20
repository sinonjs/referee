if (typeof module == "object" && typeof require == "function") {
    var buster = require("buster-core");
    buster.assert = require("../buster-assert");
}

buster.assert.that = function (actual) {
    var asserter = buster.create(buster.assert.that.asserter);
    asserter.actual = actual;

    return asserter;
};

buster.assert.that.asserter = {};

(function () {
    function buildAssertion(assertion) {
        buster.assert.that.asserter[assertion] = function () {
            var args = [this.actual].concat(Array.prototype.slice.call(arguments));
            return buster.assert[assertion].apply(buster.assert, args);
        };
    }

    for (var prop in buster.assert) {
        if (typeof buster.assert[prop] != "function") {
            continue;
        }

        if (prop != "create" && prop != "addListener" && prop != "on" &&
            prop != "removeListener" && prop != "hasListener" &&
            prop != "emit" && prop != "bind" && prop != "fail" &&
            prop != "format") {
            buildAssertion(prop);
        }
    }
}());

if (typeof module == "object") {
    module.exports = buster.assert.that;
}
