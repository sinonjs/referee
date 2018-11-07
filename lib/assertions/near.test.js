"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "near", function(pass, fail, msg, error) {
    pass("for equal numbers", 3, 3, 0);
    fail("for numbers out of delta range", 2, 3, 0.5);
    msg(
        "fail with descriptive message",
        "[assert.near] Expected 3 to be equal to 2 +/- 0.6",
        3,
        2,
        0.6
    );
    msg(
        "fail with custom message",
        "[assert.near] Ho! Expected 3 to be equal to 2 +/- 0.6",
        3,
        2,
        0.6,
        "Ho!"
    );
    pass("for numbers in delta range", 2, 3, 1);
    msg(
        "fail if not passed arguments",
        "[assert.near] Expected to receive at least 3 arguments"
    );
    error(
        "for numbers out of delta range",
        {
            code: "ERR_ASSERTION",
            actual: 2,
            expected: 3,
            operator: "assert.near"
        },
        2,
        3,
        0.5
    );
});

testHelper.assertionTests("refute", "near", function(pass, fail, msg, error) {
    fail("for equal numbers", 3, 3, 0);
    pass("for numbers out of delta range", 2, 3, 0.5);
    msg(
        "with descriptive message",
        "[refute.near] Expected 3 not to be equal to 3 +/- 0",
        3,
        3,
        0
    );
    msg(
        "with custom message",
        "[refute.near] Hey: Expected 3 not to be equal to 3 +/- 0",
        3,
        3,
        0,
        "Hey"
    );
    fail("for numbers in delta range", 2, 3, 1);
    msg(
        "fail if not passed arguments",
        "[refute.near] Expected to receive at least 3 arguments"
    );
    error(
        "for equal numbers",
        {
            code: "ERR_ASSERTION",
            operator: "refute.near"
        },
        3,
        3,
        0
    );
});
