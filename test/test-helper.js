if (typeof require != "undefined") {
    var assert = require("assert");
    var buster = { assert: require("./../lib/buster-assert") };
    var sinon = require("sinon");
}

var testHelper = {
    assertFailCallbacks: function (callback) {
        return function () {
            var failListener = sinon.spy();
            buster.assert.on("failure", failListener);
            var okListener = sinon.spy();
            buster.assert.on("pass", okListener);

            try {
                callback();
            } catch (e) {
                assert.fail("Assertion threw when it should not: " + e.message);
            }

            assert.ok(failListener.calledOnce, "Fail listener was not called once: " + failListener.callCount);
            assert.ok(!okListener.called, "Pass listener was unexpectedly called");
        };
    },

    setUp: function () {
        delete buster.assert.listeners;
        buster.assert.count = 0;

        buster.assert.format = function (object) {
            return "" + object;
        };
    },

    tearDown: function () {
        if (buster.assert.fail.restore) {
            buster.assert.fail.restore();
        }

        delete buster.assert.throwOnFailure;
    }
};


if (typeof module == "object") {
    module.exports = testHelper;
}
