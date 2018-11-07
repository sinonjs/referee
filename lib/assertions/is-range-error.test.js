"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isRangeError", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    fail("for Error", new Error("not pie"));
    pass("for RangeError", new RangeError("apple pie"));
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isRangeError] Expected {  } to be a RangeError",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isRangeError] Nope: Expected {  } to be a RangeError",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isRangeError"
        },
        {}
    );
});
