"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isRegExp", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    pass("for RegExp", new RegExp("apple pie"));
    pass("for RegExp literal", /apple pie/);
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isRegExp] Expected {  } to be a RegExp",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isRegExp] Nope: Expected {  } to be a RegExp",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isRegExp"
        },
        {}
    );
});
