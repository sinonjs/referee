"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isString", function(
    pass,
    fail,
    msg,
    error
) {
    pass("for string", "Hey");
    fail("for object", {});
    msg(
        "fail with descriptive message",
        "[assert.isString] Expected {  } (object) to be string",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isString] Snap: Expected {  } (object) to be string",
        {},
        "Snap"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            actual: "object",
            expected: "string",
            operator: "assert.isString"
        },
        {}
    );
});

testHelper.assertionTests("refute", "isString", function(
    pass,
    fail,
    msg,
    error
) {
    fail("for string", "Hey");
    pass("for object", {});
    msg(
        "fail with descriptive message",
        "[refute.isString] Expected Yo not to be string",
        "Yo"
    );
    msg(
        "fail with custom message",
        "[refute.isString] Here goes: Expected Yo not to be string",
        "Yo",
        "Here goes"
    );
    error(
        "for string",
        {
            code: "ERR_ASSERTION",
            operator: "refute.isString"
        },
        "Hey"
    );
});
