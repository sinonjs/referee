"use strict";

var testHelper = require("../test-helper");
var captureArgs = require("../test-helper/capture-args");

testHelper.assertionTests("assert", "isDate", function(pass, fail, msg, error) {
    pass("for Date", new Date());
    fail("for RegExp", new RegExp("[a-z]"));
    fail("for string", "123");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isDate] Expected {  } to be a Date",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isDate] Nope: Expected {  } to be a Date",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isDate"
        },
        {}
    );
});
