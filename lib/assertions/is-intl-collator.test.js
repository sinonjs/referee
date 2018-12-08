"use strict";

var testHelper = require("../test-helper");
var captureArgs = require("../test-helper/capture-args");

testHelper.assertionTests("assert", "isIntlCollator", function(
    pass,
    fail,
    msg,
    error
) {
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
