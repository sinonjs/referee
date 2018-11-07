"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isFloat64Array", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    fail("for Float32Array", new Float32Array(2));
    pass("for Float64Array", new Float64Array(2));
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isFloat64Array] Expected {  } to be a Float64Array",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isFloat64Array] Nope: Expected {  } to be a Float64Array",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isFloat64Array"
        },
        {}
    );
});
