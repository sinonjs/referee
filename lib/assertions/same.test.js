"use strict";

var testHelper = require("../test-helper");

var obj = { id: 42 };
var obj2 = { id: 42 };

testHelper.assertionTests("assert", "same", function(pass, fail, msg, error) {
    pass("when comparing object to itself", obj, obj);
    fail("when comparing different objects", obj, obj2);
    pass("when comparing strings", "Hey", "Hey");
    pass("when comparing booleans", true, true);
    pass("when comparing numbers", 32, 32);
    pass("when comparing infinity", Infinity, Infinity);
    fail("when comparing without coercion", 666, "666");
    fail("when comparing falsy values without coercion", 0, "");
    pass("when comparing null to null", null, null);
    pass("when comparing undefined to undefined", undefined, undefined);
    msg(
        "include objects in message",
        "[assert.same] Obj expected to be the same object as {  }",
        "Obj",
        {}
    );
    msg(
        "include custom message",
        "[assert.same] Back again: Obj expected to be the same object as {  }",
        "Obj",
        {},
        "Back again"
    );
    pass("when comparing NaN to NaN", NaN, NaN);
    fail("when comparing -0 to +0", -0, +0);
    error(
        "when comparing strings",
        {
            code: "ERR_ASSERTION",
            actual: "foo",
            expected: "bar",
            operator: "assert.same"
        },
        "foo",
        "bar"
    );
});

testHelper.assertionTests("refute", "same", function(pass, fail, msg, error) {
    fail("comparing object to itself", obj, obj);
    pass("when comparing different objects", obj, obj2);
    fail("when comparing strings", "Hey", "Hey");
    fail("when comparing booleans", true, true);
    fail("when comparing numbers", 32, 32);
    fail("when comparing infinity", Infinity, Infinity);
    fail("when comparing null to null", null, null);
    fail("when comparing undefined to undefined", undefined, undefined);
    msg(
        "include objects in message",
        "[refute.same] { id: 42 } expected not to be the same object as { id: 42 }",
        obj,
        obj
    );
    msg(
        "include custom message",
        "[refute.same] Sigh... { id: 42 } expected not to be the same object as { id: 42 }",
        obj,
        obj,
        "Sigh..."
    );
    fail("when comparing NaN to NaN", NaN, NaN);
    pass("when comparing -0 to +0", -0, +0);
    error(
        "when comparing strings",
        {
            code: "ERR_ASSERTION",
            operator: "refute.same"
        },
        "foo",
        "foo"
    );
});
