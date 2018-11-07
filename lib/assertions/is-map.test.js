"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isMap", function(pass, fail, msg, error) {
    function captureArgs() {
        return arguments;
    }

    pass("for Map", new Map());
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isMap] Expected {  } to be a Map",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isMap] Nope: Expected {  } to be a Map",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isMap"
        },
        {}
    );
});
