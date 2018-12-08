"use strict";

var testHelper = require("../test-helper");
var captureArgs = require("../test-helper/capture-args");

testHelper.assertionTests("assert", "isWeakSet", function(
    pass,
    fail,
    msg,
    error
) {
    // eslint-disable-next-line ie11/no-weak-collections
    pass("for WeakSet", new WeakSet());
    fail("for Set", new Set());
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isWeakSet] Expected {  } to be a WeakSet",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isWeakSet] Nope: Expected {  } to be a WeakSet",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isWeakSet"
        },
        {}
    );
});
