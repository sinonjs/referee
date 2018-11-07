"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isSet", function(pass, fail, msg, error) {
    function captureArgs() {
        return arguments;
    }

    pass("for Set", new Set());
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isSet] Expected {  } to be a Set",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isSet] Nope: Expected {  } to be a Set",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isSet"
        },
        {}
    );
});
