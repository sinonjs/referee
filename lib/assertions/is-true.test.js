"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isTrue", function(pass, fail, msg, error) {
    pass("for true", true);
    fail("for false", false);
    msg(
        "represent expected value in message",
        "[assert.isTrue] Expected {  } to be true",
        {}
    );
    msg(
        "include custom message",
        "[assert.isTrue] Oh: Expected {  } to be true",
        {},
        "Oh"
    );
    fail("for object", {});
    fail("for array", []);
    fail("for string", "32");
    fail("for number", 32);
    msg(
        "fail if not passed arguments",
        "[assert.isTrue] Expected to receive at least 1 argument"
    );
    error(
        "for false",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isTrue"
        },
        false
    );
});
