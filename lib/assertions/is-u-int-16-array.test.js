"use strict";

var testHelper = require("../test-helper");
var captureArgs = require("../test-helper/capture-args");

testHelper.assertionTests("assert", "isUint16Array", function(
    pass,
    fail,
    msg,
    error
) {
    pass("for Uint16Array", new Uint16Array());
    fail("for Uint32Array", new Uint32Array());
    fail("for Uint8Array", new Uint8Array());
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isUint16Array] Expected {  } to be a Uint16Array",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isUint16Array] Nope: Expected {  } to be a Uint16Array",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isUint16Array"
        },
        {}
    );
});
