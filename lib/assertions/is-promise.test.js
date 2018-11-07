"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isPromise", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    pass("for Promise", Promise.resolve("apple pie"));
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isPromise] Expected {  } to be a Promise",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isPromise] Nope: Expected {  } to be a Promise",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isPromise"
        },
        {}
    );
});
