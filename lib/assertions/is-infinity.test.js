"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isInfinity", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    pass("for Infinity", Infinity);
    fail("for NaN", NaN);
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isInfinity] Expected {  } to be Infinity",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isInfinity] Nope: Expected {  } to be Infinity",
        {},
        "Nope"
    );
    error(
        "for number",
        {
            code: "ERR_ASSERTION",
            actual: 42,
            expected: Infinity,
            operator: "assert.isInfinity"
        },
        42
    );
});
