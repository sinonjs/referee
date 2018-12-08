"use strict";

var testHelper = require("../test-helper");
var captureArgs = require("../test-helper/capture-args");

testHelper.assertionTests("assert", "isError", function(
    pass,
    fail,
    msg,
    error
) {
    pass("for Error", new Error("error"));
    pass("for EvalError", new EvalError("eval error"));
    pass("for RangeError", new RangeError("range error"));
    pass("for ReferenceError", new ReferenceError("reference error"));
    pass("for SyntaxError", new SyntaxError("syntax error"));
    pass("for TypeError", new TypeError("type error"));
    pass("for URIError", new URIError("uri error"));
    fail("for string", "not an error");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isError] Expected {  } to be an Error",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isError] Nope: Expected {  } to be an Error",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isError"
        },
        {}
    );
});
