/*jslint onevar: false, browser: true, eqeqeq: false, nomen: false,
         plusplus: false, regexp: false*/
/*global require, __dirname*/
if (typeof require != "undefined") {
    var assert = require("assert");
    var sinon = require("sinon");
    var testHelper = require("../test-helper");

    var buster = {
        assert: require("../../lib/buster-assertions"),
        util: require("buster-util")
    };

    buster.expect = require("../../lib/buster-assertions/expect");
}

buster.util.testCase("ExpectTest", {
    setUp: testHelper.setUp,
    tearDown: testHelper.tearDown,

    "should be function": function () {
        //assert.equal(typeof buster.expect, "function");
    },

    "should bind assert.equals to argument": function () {
        // assert.doesNotThrow(function () {
        //     buster.expect({}).toEqual({});
        // });
    }// ,

    // "should fail assertion if a not equals b": function () {
    //     try {
    //         buster.expect({ id: 42 }).toEqual({ bleh: "Nah" });
    //         throw new Error("Did not throw");
    //     } catch (e) {
    //         assert.equal(e.message, "[expect.toEqual] Expected [object Object] to be equal to [object Object]");
    //     }
    // },

    // "should fail assertion by calling buster.assert.fail": function () {
    //     sinon.stub(buster.assert, "fail");

    //     try {
    //         buster.expect({ id: 42 }).toEqual({ bleh: "Nah" });
    //     } catch (e) {}

    //     assert.ok(buster.assert.fail.calledOnce);
    // },

    // "should emit assertion pass event": function () {
    //     var listener = sinon.spy();
    //     buster.assert.on("pass", listener);

    //     buster.expect({ id: 42 }).toEqual({ id: 42 });

    //     assert.ok(listener.calledOnce);
    // },

    // "should emit assertion fail event": function () {
    //     var listener = sinon.spy();
    //     buster.assert.on("failure", listener);
    //     buster.assert.throwOnFailure = false;

    //     buster.expect({ id: 42 }).toEqual({ id: 22 });

    //     assert.ok(listener.calledOnce);
    // },

    // "should expose all buster.assert methods": function () {
    //     var expect = buster.expect;
    //     var obj = { id: 42 };

    //     expect(true).toBeTrue();
    //     expect(false).toBeFalse();
    //     expect(obj).toBeSameAs(obj);
    //     expect(obj).toNotBeSameAs({ id: 42 });
    //     expect(obj).toEqual({ id: 42 });
    //     expect(obj).toNotEqual({});
    //     expect(obj).toBeType("object");
    //     expect(obj).notToBeType("string");
    //     expect("Something").toBeString();
    //     expect(obj).toBeObject();
    //     expect(function () {}).toBeFunction();
    //     expect(true).toBeBoolean();
    //     expect(42).toBeNumber();
    //     expect(undefined).toBeUndefined();
    //     expect(null).notToBeUndefined();
    //     expect(null).toBeNull();
    //     expect(42).notToBeNull();
    //     expect(NaN).toBeNaN();
    //     expect(42).notToBeNaN();
    //     expect([]).toBeArray();
    //     expect({ length: 1, "0": 1}).notToBeArray();
    //     expect(arguments).toBeArrayLike();
    //     expect(obj).toMatch({ id: 42 });
    //     expect(obj).notToMatch({ id: 37 });
    //     expect(function () { throw new TypeError("Oops"); }).toThrow("TypeError");
    //     expect(function () {}).notToThrow();
    //     expect({ tagName: "li" }).toHaveTagName("li");
    //     expect({ tagName: "ol" }).toNotHaveTagName("li");
    //     expect({ className: "a b c" }).toHaveClassName("b");
    //     expect({ className: "a b c" }).toNotHaveClassName("d");
    //     expect(4.5).toBeInDelta(5, 1);
    //     expect(1).toNotBeInDelta(6, 1);
    // }
});
