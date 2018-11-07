"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isBoolean", function(
    pass,
    fail,
    msg,
    error
) {
    pass("for boolean", true);
    fail("for function", function() {});
    fail("for null", null);
    msg(
        "fail with descriptive message",
        "[assert.isBoolean] Expected Hey (string) to be boolean",
        "Hey"
    );
    msg(
        "fail with custom message",
        "[assert.isBoolean] Boolean, plz: Expected Hey (string) to be boolean",
        "Hey",
        "Boolean, plz"
    );
    error(
        "for string",
        {
            code: "ERR_ASSERTION",
            actual: "string",
            expected: "boolean",
            operator: "assert.isBoolean"
        },
        "Hey"
    );
});

testHelper.assertionTests("refute", "isBoolean", function(
    pass,
    fail,
    msg,
    error
) {
    fail("for boolean", true);
    pass("for function", function() {});
    pass("for null", null);
    msg(
        "fail with descriptive message",
        "[refute.isBoolean] Expected true not to be boolean",
        true
    );
    msg(
        "fail with custom message",
        "[refute.isBoolean] Here: Expected true not to be boolean",
        true,
        "Here"
    );
    error(
        "for boolean",
        {
            code: "ERR_ASSERTION",
            operator: "refute.isBoolean"
        },
        false
    );
});
