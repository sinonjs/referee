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

    buster.expect = buster.assertions.expect;
}

var expect = buster.expect;

buster.util.testCase("ExpectTest", {
    setUp: testHelper.setUp,
    tearDown: testHelper.tearDown,

    "should be function": function () {
        assert.equal(typeof expect, "function");
    },

    "should bind assert.equals to argument": function () {
        assert.doesNotThrow(function () {
            expect({}).toEqual({});
        });
    },

    "should fail assertion if a not equals b": function () {
        try {
            expect({ id: 42 }).toEqual({ bleh: "Nah" });
            throw new Error("Did not throw");
        } catch (e) {
            assert.equal(e.message, "[expect.toEqual] Expected [object Object] to be equal to [object Object]");
        }
    },

    "should fail assertion by calling buster.assert.fail": function () {
        try {
            expect({ id: 42 }).toEqual({ bleh: "Nah" });
        } catch (e) {}

        assert.ok(buster.assertions.fail.calledOnce);
    },

    "should emit assertion pass event": function () {
        var listener = sinon.spy();
        buster.assertions.on("pass", listener);

        expect({ id: 42 }).toEqual({ id: 42 });

        assert.ok(listener.calledOnce);
    },

    "should emit assertion fail event": function () {
        var listener = sinon.spy();
        buster.assertions.on("failure", listener);
        buster.assertions.throwOnFailure = false;

        expect({ id: 42 }).toEqual({ id: 22 });

        assert.ok(listener.calledOnce);
    },

    "should expose refutation as expectation too": function () {
        try {
            expect({ id: 42 }).not().toEqual({ id: 42 });
            throw new Error("Did not throw");
        } catch (e) {
            assert.equal(e.message, "[expect.not.toEqual] Expected [object Object] not to be equal to [object Object]");
        }
    },

    "should allow double not": function () {
        expect({ id: 42 }).not().not().toEqual({ id: 42 });
    },

    "should expose all assertions": function () {
        var expect = buster.expect;
        var obj = { id: 42 };

        expect(true).toBeTrue();
        expect(false).not().toBeTrue();
        expect(false).toBeFalse();
        expect(true).not().toBeFalse();
        expect(obj).toBeSameAs(obj);
        expect(obj).not().toBeSameAs({ id: 42 });
        expect(obj).toEqual({ id: 42 });
        expect(obj).not().toEqual({});
        expect(obj).toBeType("object");
        expect(obj).not().toBeType("string");
        expect("Something").toBeString();
        expect([]).not().toBeString();
        expect(obj).toBeObject();
        expect(false).not().toBeObject();
        expect(function () {}).toBeFunction();
        expect({}).not().toBeFunction();
        expect(true).toBeBoolean();
        expect(42).not().toBeBoolean();
        expect(42).toBeNumber();
        expect("Hey").not().toBeNumber();
        expect(undefined).toBeUndefined();
        expect(null).not().toBeUndefined();
        expect(null).toBeNull();
        expect(42).not().toBeNull();
        expect(NaN).toBeNaN();
        expect(42).not().toBeNaN();
        expect([]).toBeArray();
        expect({ length: 1, "0": 1}).not().toBeArray();
        expect(arguments).toBeArrayLike();
        expect({}).not().toBeArrayLike();
        expect(obj).toMatch({ id: 42 });
        expect(obj).not().toMatch({ id: 37 });
        expect(function () { throw new TypeError("Oops"); }).toThrow("TypeError");
        expect(function () {}).not().toThrow();
        expect({ tagName: "li" }).toHaveTagName("li");
        expect({ tagName: "ol" }).not().toHaveTagName("li");
        expect({ className: "a b c" }).toHaveClassName("b");
        expect({ className: "a b c" }).not().toHaveClassName("d");
        expect(4.5).toBeInDelta(5, 1);
        expect(1).not().toBeInDelta(6, 1);
    }
});
