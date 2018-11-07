"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isArrayBuffer", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    pass("for ArrayBuffer", new global.ArrayBuffer(8));
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isArrayBuffer] Expected {  } to be an ArrayBuffer",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isArrayBuffer] Nope: Expected {  } to be an ArrayBuffer",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isArrayBuffer"
        },
        {}
    );
});
