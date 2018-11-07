"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isDate", function(pass, fail, msg, error) {
    function captureArgs() {
        return arguments;
    }

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
