"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isFloat32Array", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    pass("for Float32Array", new Float32Array(2));
    fail("for Float64Array", new Float64Array(2));
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isFloat32Array] Expected {  } to be a Float32Array",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isFloat32Array] Nope: Expected {  } to be a Float32Array",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isFloat32Array"
        },
        {}
    );
});
