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
            var callFunc;

            if (assertion === "assert") {
                callFunc = this.assertMode ? ba.assert : ba.refute;
            } else if (assertion === "refute") {
                callFunc = this.assertMode ? ba.refute : ba.assert;
            } else {
                callFunc = ba[type][assertion];
            }

            try {
                return callFunc.apply(ba.expect, args);
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

    ba.expect.wrapAssertion("assert", "toBeTruthy");
    ba.expect.wrapAssertion("refute", "toBeFalsy");

    if (typeof module == "object") {
        module.exports = ba.expect;
    }
}(buster.assertions));
