"use strict";

var testHelper = require("../test-helper");
var captureArgs = require("../test-helper/capture-args");

testHelper.assertionTests("assert", "isPromise", function(
    pass,
    fail,
    msg,
    error
) {
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
