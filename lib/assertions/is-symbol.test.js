"use strict";

var testHelper = require("../test-helper");
var captureArgs = require("../test-helper/capture-args");

testHelper.assertionTests("assert", "isSymbol", function(
    pass,
    fail,
    msg,
    error
) {
    pass("for Symbol", Symbol("apple pie"));
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isSymbol] Expected {  } to be a Symbol",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isSymbol] Nope: Expected {  } to be a Symbol",
        {},
        "Nope"
    );
    error(
        "for string",
        {
            code: "ERR_ASSERTION",
            actual: "apple pie",
            expected: "symbol",
            operator: "assert.isSymbol"
        },
        "apple pie"
    );
});
