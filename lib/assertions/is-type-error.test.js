"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isTypeError", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    fail("for Error", new Error("not pie"));
    pass("for TypeError", new TypeError("apple pie"));
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isTypeError] Expected {  } to be a TypeError",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isTypeError] Nope: Expected {  } to be a TypeError",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isTypeError"
        },
        {}
    );
});
