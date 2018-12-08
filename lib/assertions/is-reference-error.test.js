"use strict";

var testHelper = require("../test-helper");
var captureArgs = require("../test-helper/capture-args");

testHelper.assertionTests("assert", "isReferenceError", function(
    pass,
    fail,
    msg,
    error
) {
    fail("for Error", new Error("not pie"));
    pass("for ReferenceError", new ReferenceError("apple pie"));
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isReferenceError] Expected {  } to be a ReferenceError",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isReferenceError] Nope: Expected {  } to be a ReferenceError",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isReferenceError"
        },
        {}
    );
});
