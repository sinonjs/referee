"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isArray", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    var arrayLike = {
        length: 4,
        "0": "One",
        "1": "Two",
        "2": "Three",
        "3": "Four",
        splice: function() {}
    };

    pass("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    fail("for array like", arrayLike);
    msg(
        "fail with descriptive message",
        "[assert.isArray] Expected {  } to be array",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isArray] Nope: Expected {  } to be array",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isArray"
        },
        {}
    );
});

testHelper.assertionTests("refute", "isArray", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    var arrayLike = {
        length: 4,
        "0": "One",
        "1": "Two",
        "2": "Three",
        "3": "Four",
        splice: function() {}
    };

    fail("for array", []);
    pass("for object", {});
    pass("for arguments", captureArgs());
    pass("for array like", arrayLike);
    msg(
        "fail with descriptive message",
        "[refute.isArray] Expected [1, 2] not to be array",
        [1, 2]
    );
    msg(
        "fail with custom message",
        "[refute.isArray] Hmm: Expected [1, 2] not to be array",
        [1, 2],
        "Hmm"
    );
    error(
        "for array",
        {
            code: "ERR_ASSERTION",
            operator: "refute.isArray"
        },
        []
    );
});
