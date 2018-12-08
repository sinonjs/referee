"use strict";

var testHelper = require("../test-helper");
var captureArgs = require("../test-helper/capture-args");

testHelper.assertionTests("assert", "isUint32Array", function(
    pass,
    fail,
    msg,
    error
) {
    fail("for Uint16Array", new Uint16Array());
    pass("for Uint32Array", new Uint32Array());
    fail("for Uint8Array", new Uint8Array());
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isUint32Array] Expected {  } to be a Uint32Array",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isUint32Array] Nope: Expected {  } to be a Uint32Array",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isUint32Array"
        },
        {}
    );
});
