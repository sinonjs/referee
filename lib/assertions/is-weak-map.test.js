"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isWeakMap", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    // eslint-disable-next-line ie11/no-weak-collections
    pass("for WeakMap", new WeakMap());
    fail("for Map", new Map());
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isWeakMap] Expected {  } to be a WeakMap",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isWeakMap] Nope: Expected {  } to be a WeakMap",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isWeakMap"
        },
        {}
    );
});
