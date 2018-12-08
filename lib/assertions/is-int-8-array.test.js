"use strict";

var testHelper = require("../test-helper");
var captureArgs = require("../test-helper/capture-args");

testHelper.assertionTests("assert", "isInt8Array", function(
    pass,
    fail,
    msg,
    error
) {
    pass("for Int8Array", new Int8Array(2));
    fail("for Int16Array", new Int16Array(2));
    fail("for Int32Array", new Int32Array(2));
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isInt8Array] Expected {  } to be an Int8Array",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isInt8Array] Nope: Expected {  } to be an Int8Array",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isInt8Array"
        },
        {}
    );
});
