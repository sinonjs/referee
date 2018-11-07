"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isIntlDateTimeFormat", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    pass("for Intl.DateTimeFormat", new Intl.DateTimeFormat());
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isIntlDateTimeFormat] Expected {  } to be an Intl.DateTimeFormat",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isIntlDateTimeFormat] Nope: Expected {  } to be an Intl.DateTimeFormat",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isIntlDateTimeFormat"
        },
        {}
    );
});
