"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isIntlNumberFormat", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    pass("for Intl.NumberFormat", new Intl.NumberFormat());
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isIntlNumberFormat] Expected {  } to be an Intl.NumberFormat",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isIntlNumberFormat] Nope: Expected {  } to be an Intl.NumberFormat",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isIntlNumberFormat"
        },
        {}
    );
});
