"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isNumber", function(
    pass,
    fail,
    msg,
    error
) {
    pass("for number", 32);
    fail("for NaN (sic)", NaN);
    fail("for function", function() {});
    fail("for null", null);
    msg(
        "fail with descriptive message",
        "[assert.isNumber] Expected Hey (string) to be a non-NaN number",
        "Hey"
    );
    msg(
        "fail with custom message",
        "[assert.isNumber] Check it: Expected Hey (string) to be a non-NaN number",
        "Hey",
        "Check it"
    );
    error(
        "for string",
        {
            code: "ERR_ASSERTION",
            actual: "string",
            expected: "number",
            operator: "assert.isNumber"
        },
        "Hey"
    );
});

testHelper.assertionTests("refute", "isNumber", function(
    pass,
    fail,
    msg,
    error
) {
    fail("for number", 32);
    pass("for NaN (sic)", NaN);
    pass("for function", function() {});
    pass("for null", null);
    msg(
        "fail with descriptive message",
        "[refute.isNumber] Ho ho! Expected 42 to be NaN or a non-number value",
        42,
        "Ho ho!"
    );
    error(
        "for number",
        {
            code: "ERR_ASSERTION",
            operator: "refute.isNumber"
        },
        42
    );
});
