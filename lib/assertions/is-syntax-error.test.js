"use strict";

var testHelper = require("../test-helper");
var captureArgs = require("../test-helper/capture-args");

testHelper.assertionTests("assert", "isSyntaxError", function(
    pass,
    fail,
    msg,
    error
) {
    fail("for Error", new Error("not pie"));
    pass("for SyntaxError", new SyntaxError("apple pie"));
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isSyntaxError] Expected {  } to be a SyntaxError",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isSyntaxError] Nope: Expected {  } to be a SyntaxError",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isSyntaxError"
        },
        {}
    );
});
