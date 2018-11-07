"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isFalse", function(
    pass,
    fail,
    msg,
    error
) {
    pass("for false", false);
    fail("for true", true);
    msg(
        "fail with message",
        "[assert.isFalse] Expected true to be false",
        true
    );
    msg(
        "fail with custom message",
        "[assert.isFalse] Nooo! Expected true to be false",
        true,
        "Nooo!"
    );
    msg(
        "represent expected value in message",
        "[assert.isFalse] Expected {  } to be false",
        {}
    );
    fail("for empty string", "");
    fail("for 0", 0);
    fail("for NaN", NaN);
    fail("for null", null);
    fail("for undefined", undefined);
    error(
        "for true",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isFalse"
        },
        true
    );
});
