"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "contains", function(
    pass,
    fail,
    msg,
    error
) {
    pass("when array contains value", [0, 1, 2], 1);
    fail("when array does not contain value", [0, 1, 2], 3);
    msg(
        "with descriptive message",
        "[assert.contains] Expected [0, 1, 2] to contain 3",
        [0, 1, 2],
        3
    );
    var thing = {};
    var someOtherThing = {};
    pass("when array contains the actual object", [thing], thing);
    fail(
        "when array contains different object with same value",
        [thing],
        someOtherThing
    );
    error(
        "when array does not contain value",
        {
            code: "ERR_ASSERTION",
            actual: [0, 1, 2],
            expected: 3,
            operator: "assert.contains"
        },
        [0, 1, 2],
        3
    );
});

testHelper.assertionTests("refute", "contains", function(
    pass,
    fail,
    msg,
    error
) {
    fail("when array contains value", [0, 1, 2], 1);
    pass("when array does not contain value", [0, 1, 2], 3);
    msg(
        "with descriptive message",
        "[refute.contains] Expected [0, 1, 2] not to contain 2",
        [0, 1, 2],
        2
    );
    var thing = {};
    var someOtherThing = {};
    fail("when array contains the actual object", [thing], thing);
    pass(
        "when array contains different object with same value",
        [thing],
        someOtherThing
    );
    error(
        "when array contains value",
        {
            code: "ERR_ASSERTION",
            operator: "refute.contains"
        },
        [0, 1, 2],
        1
    );
});
