"use strict";

var testHelper = require("../test-helper");
var captureArgs = require("../test-helper/capture-args");

testHelper.assertionTests("assert", "isInt32Array", function(
    pass,
    fail,
    msg,
    error
) {
    fail("for Int8Array", new Int8Array(2));
    fail("for Int16Array", new Int16Array(2));
    pass("for Int32Array", new Int32Array(2));
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isInt32Array] Expected {  } to be an Int32Array",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isInt32Array] Nope: Expected {  } to be an Int32Array",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isInt32Array"
        },
        {}
    );
});
