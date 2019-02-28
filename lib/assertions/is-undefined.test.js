"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isUndefined", function(
    pass,
    fail,
    msg,
    error
) {
    fail("for array", {});
    fail("for boolean", true);
    fail("for function", function() {});
    fail("for null", null);
    fail("for number", 42);
    fail("for object", {});
    fail("for string", "Test");
    pass("for undefined", undefined);
    msg(
        "fail with descriptive message",
        "[assert.isUndefined] Expected null (object) to be undefined",
        null
    );
    msg(
        "fail with custom message",
        "[assert.isUndefined] fails: Expected null (object) to be undefined",
        null,
        "fails"
    );
    error(
        "for null",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isUndefined"
        },
        null
    );
});
