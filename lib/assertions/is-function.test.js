"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isFunction", function(
    pass,
    fail,
    msg,
    error
) {
    pass("for function", function() {});
    fail("for object", {});
    msg(
        "fail with descriptive message",
        "[assert.isFunction] Hey (string) expected to be function",
        "Hey"
    );
    msg(
        "fail with custom message",
        "[assert.isFunction] Oh no: Hey (string) expected to be function",
        "Hey",
        "Oh no"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            actual: "object",
            expected: "function",
            operator: "assert.isFunction"
        },
        {}
    );
});

testHelper.assertionTests("refute", "isFunction", function(
    pass,
    fail,
    msg,
    error
) {
    fail("for function", function() {});
    pass("for object", {});
    msg(
        "fail with descriptive message",
        "[refute.isFunction] function () {} expected not to be function",
        function() {}
    );
    msg(
        "fail with custom message",
        "[refute.isFunction] Hmm: function () {} expected not to be function",
        function() {},
        "Hmm"
    );
    error(
        "for function",
        {
            code: "ERR_ASSERTION",
            operator: "refute.isFunction"
        },
        function() {}
    );
});
