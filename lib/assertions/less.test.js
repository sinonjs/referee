"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "less", function(pass, fail, msg, error) {
    fail("when greater than", 2, 1);
    fail("when equal", 1, 1);
    pass("when less than", 0, 1);
    msg(
        "fail with descriptive message",
        "[assert.less] Expected 2 to be less than 1",
        2,
        1
    );
    error(
        "when greater than",
        {
            code: "ERR_ASSERTION",
            actual: 2,
            expected: 1,
            operator: "assert.less"
        },
        2,
        1
    );
});

testHelper.assertionTests("refute", "less", function(pass, fail, msg, error) {
    pass("when greater than", 2, 1);
    pass("when equal", 1, 1);
    fail("when less than", 0, 1);
    msg(
        "fail with descriptive message",
        "[refute.less] Expected 1 to be greater than or equal to 2",
        1,
        2
    );
    error(
        "when less than",
        {
            code: "ERR_ASSERTION",
            operator: "refute.less"
        },
        0,
        1
    );
});
