((typeof define === "function" && define.amd && function (m) {
    define("expect", ["lodash"], m);
}) || (typeof module === "object" && function (m) {
    module.exports = m(require("lodash"));
}) || function (m) { this.expect = m(this._); }
)(function (_) {
    var expectation = {};
    function F() {}
    var create = function (object) { F.prototype = object; return new F(); };

    var expect = function (actual) {
        var expectation = _.extend(create(expect.expectation), {
            actual: actual,
            assertMode: true
        });
        expectation.not = create(expectation);
        expectation.not.assertMode = false;
        return expectation;
    };

    expect.expectation = expectation;

    expect.wrapAssertion = function (assertion, expectation, referee) {
        expect.expectation[expectation] = function () {
            var args = [this.actual].concat(_.toArray(arguments));
            var type = this.assertMode ? "assert" : "refute";
            var callFunc;

            if (assertion === "assert") {
                callFunc = this.assertMode ? referee.assert : referee.refute;
            } else if (assertion === "refute") {
                callFunc = this.assertMode ? referee.refute : referee.assert;
            } else {
                callFunc = referee[type][assertion];
            }

            try {
                return callFunc.apply(referee.expect, args);
            } catch (e) {
                e.message = (e.message || "").replace(
                    "[" + type + "." + assertion + "]",
                    "[expect." + (this.assertMode ? "" : "not.") +
                        expectation + "]"
                );
                throw e;
            }
        };
    };

    expect.init = function (referee) {
        _.each(_.keys(referee.assert), function (name) {
            var expectationName = referee.assert[name].expectationName;
            if (expectationName) {
                expect.wrapAssertion(name, expectationName, referee);
            }
        });

        expect.wrapAssertion("assert", "toBeTruthy", referee);
        expect.wrapAssertion("refute", "toBeFalsy", referee);

        if (expect.expectation.toBeNear) {
            expect.expectation.toBeCloseTo = expect.expectation.toBeNear;
        }
    };

    return expect;
});
