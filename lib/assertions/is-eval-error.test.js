"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isEvalError", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    fail("for Error", new Error("error"));
    pass("for EvalError", new EvalError("eval error"));
    fail("for RangeError", new RangeError("range error"));
    fail("for ReferenceError", new ReferenceError("reference error"));
    fail("for SyntaxError", new SyntaxError("syntax error"));
    fail("for TypeError", new TypeError("type error"));
    fail("for URIError", new URIError("uri error"));
    fail("for string", "not an error");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isEvalError] Expected {  } to be an EvalError",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isEvalError] Nope: Expected {  } to be an EvalError",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isEvalError"
        },
        {}
    );
});
