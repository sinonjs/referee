/*jslint onevar: false, browser: true, eqeqeq: false, nomen: false,
         plusplus: false, regexp: false*/
/*global require, __dirname*/
if (typeof require != "undefined") {
    var assert = require("assert");
    var sinon = require("sinon");
    var testHelper = require("../test-helper");

    var buster = {
        assertions: require("../../lib/buster-assertions"),
        util: require("buster-util")
    };

    buster.assertions.assert.that = require("../../lib/buster-assertions/assert-that");
}

(function () {
    var ba = buster.assertions;

    buster.util.testCase("AssertThatTest", {
        setUp: testHelper.setUp,
        tearDown: testHelper.tearDown,

        "should be function": function () {
            assert.equal(typeof ba.assert.that, "function");
        },

        "should bind assert.equals to argument": function () {
            assert.doesNotThrow(function () {
                ba.assert.that({}).equals({});
            });
        },

        "should fail assertion if a not equals b": function () {
            try {
                ba.assert.that({ id: 42 }).equals({ bleh: "Nah" });
                throw new Error("Did not throw");
            } catch (e) {
                assert.equal(e.message, "[assert.equals] Expected [object Object] to be equal to [object Object]");
            }
        },

        "should fail assertion by calling buster.assertions.fail": function () {
            try {
                ba.assert.that({ id: 42 }).equals({ bleh: "Nah" });
            } catch (e) {}

            assert.ok(ba.fail.calledOnce);
        },

        "should emit assertion pass event": function () {
            var listener = sinon.spy();
            ba.on("pass", listener);

            ba.assert.that({ id: 42 }).equals({ id: 42 });

            assert.ok(listener.calledOnce);
        },

        "should emit assertion fail event": function () {
            var listener = sinon.spy();
            ba.on("failure", listener);
            ba.throwOnFailure = false;

            ba.assert.that({ id: 42 }).equals({ id: 22 });

            assert.ok(listener.calledOnce);
        },

        "should expose all assert methods": function () {
            var asserter = ba.assert.that({});

            for (var prop in ba.assert) {
                if (typeof ba.assert[prop] != "function") {
                    assert.equal(typeof asserter[prop], "undefined");
                } else {
                    assert.equal(typeof asserter[prop], "function");
                }
            }
        }
    });
}());