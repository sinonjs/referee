"use strict";

var testHelper = require("../test-helper");
var captureArgs = require("../test-helper/capture-args");

testHelper.assertionTests("assert", "isURIError", function(
    pass,
    fail,
    msg,
    error
) {
    fail("for Error", new Error("not pie"));
    pass("for URIError", new URIError("apple pie"));
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isURIError] Expected {  } to be a URIError",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isURIError] Nope: Expected {  } to be a URIError",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isURIError"
        },
        {}
    );
});
