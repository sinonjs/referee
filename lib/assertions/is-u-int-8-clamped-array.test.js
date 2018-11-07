"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isUint8ClampedArray", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    fail("for Uint8Array", new Uint8Array());
    pass("for Uint8ClampedArray", new Uint8ClampedArray());
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isUint8ClampedArray] Expected {  } to be a Uint8ClampedArray",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isUint8ClampedArray] Nope: Expected {  } to be a Uint8ClampedArray",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isUint8ClampedArray"
        },
        {}
    );
});
