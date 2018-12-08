"use strict";

var testHelper = require("../test-helper");
var captureArgs = require("../test-helper/capture-args");

testHelper.assertionTests("assert", "isInfinity", function(
    pass,
    fail,
    msg,
    error
) {
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
