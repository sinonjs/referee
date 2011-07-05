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

    buster.assertions.refute.that = require("../../lib/buster-assertions/refute-that");
}

(function () {
    var ba = buster.assertions;

    buster.util.testCase("refute.thatTest", {
        setUp: testHelper.setUp,
        tearDown: testHelper.tearDown,

        "should be function": function () {
            assert.equal(typeof ba.refute.that, "function");
        },

        "should bind refute.equals to argument": function () {
            assert.doesNotThrow(function () {
                ba.refute.that({}).equals([]);
            });
        },

        "should fail assertion if a not equals b": function () {
            try {
                ba.refute.that({ id: 42 }).equals({ id: 42 });
                throw new Error("Did not throw");
            } catch (e) {
                assert.equal(e.message, "[refute.equals] Expected [object Object] not to be equal to [object Object]");
            }
        },

        "should fail assertion by calling buster.assertions.fail": function () {
            try {
                ba.refute.that({ id: 42 }).equals({ id: 42 });
            } catch (e) {}

            assert.ok(ba.fail.calledOnce);
        },

        "should emit assertion pass event": function () {
            var listener = sinon.spy();
            ba.on("pass", listener);

            ba.refute.that({ id: 42 }).equals({ id: 43 });

            assert.ok(listener.calledOnce);
        },

        "should emit assertion fail event": function () {
            var listener = sinon.spy();
            ba.on("failure", listener);
            ba.throwOnFailure = false;

            ba.refute.that({ id: 42 }).equals({ id: 42 });

            assert.ok(listener.calledOnce);
        },

        "should expose all assert methods": function () {
            var asserter = ba.refute.that({});

            for (var prop in ba.refute) {
                if (typeof ba.assert[prop] != "function") {
                    assert.equal(typeof asserter[prop], "undefined");
                } else {
                    assert.equal(typeof asserter[prop], "function");
                }
            }
        }
    });
}());
