"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isObject", function(
    pass,
    fail,
    msg,
    error
) {
    pass("for object", {});
    fail("for function", function() {});
    fail("for null", null);
    msg(
        "fail with descriptive message",
        "[assert.isObject] Hey (string) expected to be object and not null",
        "Hey"
    );
    msg(
        "fail with custom message",
        "[assert.isObject] OH! Hey (string) expected to be object and not null",
        "Hey",
        "OH!"
    );
    error(
        "for function",
        {
            code: "ERR_ASSERTION",
            actual: "function",
            expected: "object",
            operator: "assert.isObject"
        },
        function() {}
    );
});

testHelper.assertionTests("refute", "isObject", function(
    pass,
    fail,
    msg,
    error
) {
    fail("for object", {});
    pass("for function", function() {});
    pass("for null", null);
    msg(
        "fail with descriptive message",
        "[refute.isObject] {  } expected to be null or not an object",
        {}
    );
    msg(
        "fail with custom message",
        "[refute.isObject] Oh no! {  } expected to be null or not an object",
        {},
        "Oh no!"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "refute.isObject"
        },
        {}
    );
});
