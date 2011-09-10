if (typeof module == "object" && typeof require == "function") {
    var buster = require("buster-core");
    buster.assertions = require("../buster-assertions");
}

(function (ba) {
    ba.expect = function (actual) {
        var expectation = buster.create(ba.expect.expectation);
        expectation.actual = actual;
        expectation.assertMode = true;

        return expectation;
    };

    ba.expect.expectation = {
        not: function () {
            this.assertMode = !this.assertMode;
            return this;
        }
    };

    ba.expect.wrapAssertion = function (assertion, expectation) {
        ba.expect.expectation[expectation] = function () {
            var args = [this.actual].concat(Array.prototype.slice.call(arguments));
            var type = this.assertMode ? "assert" : "refute"

            try {
                return ba[type][assertion].apply(ba.expect, args);
            } catch (e) {
                e.message = (e.message || "").replace(
                    "[" + type + "." + assertion + "]",
                    "[expect." + (this.assertMode ? "" : "not.") + expectation + "]");
                throw e;
            }
        };
    }

    var prop, expectationName;

    for (prop in ba.assert) {
        if (ba.assert[prop].expectationName) {
            expectationName = ba.assert[prop].expectationName;
            ba.expect.wrapAssertion(prop, expectationName);
        }
    }

    if (typeof module == "object") {
        module.exports = ba.expect;
    }
}(buster.assertions));
