"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "defined", function(
    pass,
    fail,
    msg,
    error
) {
    fail("for undefined", undefined);
    pass("for function", function() {});
    pass("for null", null);
    msg(
        "fail with descriptive message",
        "[assert.defined] Expected to be defined",
        undefined
    );
    msg(
        "fail with custom message",
        "[assert.defined] Huh? Expected to be defined",
        undefined,
        "Huh?"
    );
    error(
        "for undefined",
        {
            code: "ERR_ASSERTION",
            operator: "assert.defined"
        },
        undefined
    );
});

testHelper.assertionTests("refute", "defined", function(
    pass,
    fail,
    msg,
    error
) {
    pass("for undefined", undefined);
    fail("for function", function() {});
    fail("for null", null);
    msg(
        "fail with descriptive message",
        "[refute.defined] Expected Hey (string) not to be defined",
        "Hey"
    );
    msg(
        "fail with custom message",
        "[refute.defined] Yawn... Expected Hey (string) not to be defined",
        "Hey",
        "Yawn..."
    );
    error(
        "for null",
        {
            code: "ERR_ASSERTION",
            operator: "refute.defined"
        },
        null
    );
});
