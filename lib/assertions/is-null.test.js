"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isNull", function(pass, fail, msg, error) {
    pass("for null", null);
    fail("for function", function() {});
    fail("for undefined", undefined);
    msg(
        "fail with descriptive message",
        "[assert.isNull] Expected Hey to be null",
        "Hey"
    );
    msg(
        "fail with custom message",
        "[assert.isNull] Hmm: Expected Hey to be null",
        "Hey",
        "Hmm"
    );
    error(
        "for undefined",
        {
            code: "ERR_ASSERTION",
            actual: undefined,
            expected: null,
            operator: "assert.isNull"
        },
        undefined
    );
});

testHelper.assertionTests("refute", "isNull", function(pass, fail, msg, error) {
    fail("for null", null);
    pass("for function", function() {});
    pass("for undefined", undefined);
    msg(
        "fail with descriptive message",
        "[refute.isNull] Expected not to be null",
        null
    );
    msg(
        "fail with custom message",
        "[refute.isNull] Here: Expected not to be null",
        null,
        "Here"
    );
    error(
        "for null",
        {
            code: "ERR_ASSERTION",
            operator: "refute.isNull"
        },
        null
    );
});
