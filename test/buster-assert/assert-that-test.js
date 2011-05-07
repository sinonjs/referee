/*jslint onevar: false, browser: true, eqeqeq: false, nomen: false,
         plusplus: false, regexp: false*/
/*global require, __dirname*/
if (typeof require != "undefined") {
    var assert = require("assert");
    var sinon = require("sinon");
    var testHelper = require("../test-helper");

    var buster = {
        assert: require("../../lib/buster-assert"),
        util: require("buster-util")
    };

    buster.assert.that = require("../../lib/buster-assert/assert-that");
}

buster.util.testCase("AssertThatTest", {
    setUp: testHelper.setUp,
    tearDown: testHelper.tearDown,

    "should be function": function () {
        assert.equal(typeof buster.assert.that, "function");
    },

    "should bind assert.equals to argument": function () {
        assert.doesNotThrow(function () {
            buster.assert.that({}).equals({});
        });
    },

    "should fail assertion if a not equals b": function () {
        try {
            buster.assert.that({ id: 42 }).equals({ bleh: "Nah" });
            throw new Error("Did not throw");
        } catch (e) {
            assert.equal(e.message, "[assert.equals] Expected [object Object] to be equal to [object Object]");
        }
    },

    "should fail assertion by calling buster.assert.fail": function () {
        sinon.stub(buster.assert, "fail");

        try {
            buster.assert.that({ id: 42 }).equals({ bleh: "Nah" });
        } catch (e) {}

        assert.ok(buster.assert.fail.calledOnce);
    },

    "should emit assertion pass event": function () {
        var listener = sinon.spy();
        buster.assert.on("pass", listener);

        buster.assert.that({ id: 42 }).equals({ id: 42 });

        assert.ok(listener.calledOnce);
    },

    "should emit assertion fail event": function () {
        var listener = sinon.spy();
        buster.assert.on("failure", listener);
        buster.assert.throwOnFailure = false;

        buster.assert.that({ id: 42 }).equals({ id: 22 });

        assert.ok(listener.calledOnce);
    },

    "should expose all buster.assert methods": function () {
        var asserter = buster.assert.that({});

        for (var prop in buster.assert) {
            if (typeof buster.assert[prop] != "function" ||
                prop == "create" || prop == "addListener" || prop == "on" ||
                prop == "removeListener" || prop == "hasListener" ||
                prop == "emit" || prop == "bind" || prop == "fail" ||
                prop == "format") {
                assert.equal(typeof asserter[prop], "undefined");
            } else {
                assert.equal(typeof asserter[prop], "function");
            }
        }
    }
});
