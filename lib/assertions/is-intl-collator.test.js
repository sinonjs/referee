"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isIntlCollator", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    pass("for Intl.Collator", new Intl.Collator());
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isIntlCollator] Expected {  } to be an Intl.Collator",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isIntlCollator] Nope: Expected {  } to be an Intl.Collator",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isIntlCollator"
        },
        {}
    );
});
