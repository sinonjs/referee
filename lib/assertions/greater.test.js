"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "greater", function(
    pass,
    fail,
    msg,
    error
) {
    pass("when greater than", 2, 1);
    fail("when equal", 1, 1);
    fail("when less than", 0, 1);
    msg(
        "fail with descriptive message",
        "[assert.greater] Expected 1 to be greater than 2",
        1,
        2
    );
    error(
        "when less than",
        {
            code: "ERR_ASSERTION",
            actual: 0,
            expected: 1,
            operator: "assert.greater"
        },
        0,
        1
    );
});

testHelper.assertionTests("refute", "greater", function(
    pass,
    fail,
    msg,
    error
) {
    fail("when greater than", 2, 1);
    pass("when equal", 1, 1);
    pass("when less than", 0, 1);
    msg(
        "fail with descriptive message",
        "[refute.greater] Expected 2 to be less than or equal to 1",
        2,
        1
    );
    error(
        "when greater than",
        {
            code: "ERR_ASSERTION",
            operator: "refute.greater"
        },
        2,
        1
    );
});
