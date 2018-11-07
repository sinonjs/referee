"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "keys", function(pass, fail, msg, error) {
    function Class(o) {
        for (var key in o) {
            if (o.hasOwnProperty(key)) {
                this[key] = o[key];
            }
        }
    }
    Class.prototype.methodA = function() {};
    Class.prototype.methodB = function() {};

    pass("when keys are exact", { a: 1, b: 2, c: 3 }, ["a", "b", "c"]);
    fail("when keys are missing", { a: 1, b: 2, c: 3 }, ["a", "b"]);
    fail("when keys are excess", { a: 1, b: 2, c: 3 }, ["a", "b", "c", "d"]);
    fail("when keys are not exact", { a: 1, b: 2, c: 3 }, ["a", "b", "d"]);
    pass("when there are no keys", {}, []);
    pass("when values are special", { a: -1, b: null, c: undefined }, [
        "a",
        "b",
        "c"
    ]);
    pass("and ignore object methods", new Class({ a: 1, b: 2, c: 3 }), [
        "a",
        "b",
        "c"
    ]);
    pass(
        "and allow overwriting object methods",
        new Class({ a: 1, methodA: 2 }),
        ["a", "methodA"]
    );

    msg(
        "fail with message",
        '[assert.keys] Expected { a: 1, b: 2, c: 3 } to have exact keys ["a", "b"]',
        { a: 1, b: 2, c: 3 },
        ["a", "b"]
    );

    msg(
        "fail with custom message",
        '[assert.keys] Too bad: Expected { a: 1, b: 2, c: 3 } to have exact keys ["a", "b"]',
        { a: 1, b: 2, c: 3 },
        ["a", "b"],
        "Too bad"
    );

    error(
        "when keys are missing",
        {
            code: "ERR_ASSERTION",
            actual: ["a", "b", "c"],
            expected: ["a", "b"],
            operator: "assert.keys"
        },
        { a: 1, b: 2, c: 3 },
        ["a", "b"]
    );
});

testHelper.assertionTests("refute", "keys", function(pass, fail, msg, error) {
    function Class(o) {
        for (var key in o) {
            if (o.hasOwnProperty(key)) {
                this[key] = o[key];
            }
        }
    }
    Class.prototype.methodA = function() {};
    Class.prototype.methodB = function() {};

    fail("when keys are exact", { a: 1, b: 2, c: 3 }, ["a", "b", "c"]);
    pass("when keys are missing", { a: 1, b: 2, c: 3 }, ["a", "b"]);
    pass("when keys are excess", { a: 1, b: 2, c: 3 }, ["a", "b", "c", "d"]);
    pass("when keys are not exact", { a: 1, b: 2, c: 3 }, ["a", "b", "d"]);
    fail("when there are no keys", {}, []);
    fail("when values are special", { a: -1, b: null, c: undefined }, [
        "a",
        "b",
        "c"
    ]);
    fail("and ignore object methods", new Class({ a: 1, b: 2, c: 3 }), [
        "a",
        "b",
        "c"
    ]);
    fail(
        "and allow overwriting object methods",
        new Class({ a: 1, methodA: 2 }),
        ["a", "methodA"]
    );

    msg(
        "fail with message",
        '[refute.keys] Expected not to have exact keys ["a", "b", "c"]',
        { a: 1, b: 2, c: 3 },
        ["a", "b", "c"]
    );

    msg(
        "fail with custom message",
        '[refute.keys] Too bad: Expected not to have exact keys ["a", "b", "c"]',
        { a: 1, b: 2, c: 3 },
        ["a", "b", "c"],
        "Too bad"
    );
    error(
        "when keys are exact",
        {
            code: "ERR_ASSERTION",
            operator: "refute.keys"
        },
        { a: 1, b: 2, c: 3 },
        ["a", "b", "c"]
    );
});
