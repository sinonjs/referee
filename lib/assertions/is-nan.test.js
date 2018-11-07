"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isNaN", function(pass, fail, msg, error) {
    pass("for NaN", NaN);
    fail("for number", 32);
    fail("for function", function() {});
    fail("for object", {});
    fail("for null", null);
    msg(
        "fail with descriptive message",
        "[assert.isNaN] Expected 32 to be NaN",
        32
    );
    msg(
        "fail with custom message",
        "[assert.isNaN] No! Expected 32 to be NaN",
        32,
        "No!"
    );
    error(
        "for number",
        {
            code: "ERR_ASSERTION",
            actual: 42,
            expected: "NaN",
            operator: "assert.isNaN"
        },
        42
    );
});

testHelper.assertionTests("refute", "isNaN", function(pass, fail, msg, error) {
    fail("for NaN", NaN);
    pass("for number", 32);
    pass("for function", function() {});
    pass("for object", {});
    pass("for null", null);
    msg(
        "fail with descriptive message",
        "[refute.isNaN] Expected not to be NaN",
        NaN
    );
    msg(
        "fail with custom message",
        "[refute.isNaN] Hey: Expected not to be NaN",
        NaN,
        "Hey"
    );
    error(
        "for NaN",
        {
            code: "ERR_ASSERTION",
            operator: "refute.isNaN"
        },
        NaN
    );
});
