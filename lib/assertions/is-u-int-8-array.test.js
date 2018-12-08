"use strict";

var testHelper = require("../test-helper");
var captureArgs = require("../test-helper/capture-args");

testHelper.assertionTests("assert", "isUint8Array", function(
    pass,
    fail,
    msg,
    error
) {
    fail("for Uint16Array", new Uint16Array());
    fail("for Uint32Array", new Uint32Array());
    pass("for Uint8Array", new Uint8Array());
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isUint8Array] Expected {  } to be a Uint8Array",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isUint8Array] Nope: Expected {  } to be a Uint8Array",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isUint8Array"
        },
        {}
    );
});
