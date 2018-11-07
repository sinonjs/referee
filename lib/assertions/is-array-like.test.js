"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "isArrayLike", function(
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
    pass("for arguments", captureArgs());
    pass("for array like", arrayLike);
    msg(
        "fail with descriptive message",
        "[assert.isArrayLike] Expected {  } to be array like",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isArrayLike] Here! Expected {  } to be array like",
        {},
        "Here!"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isArrayLike"
        },
        {}
    );
});

testHelper.assertionTests("refute", "isArrayLike", function(
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
    fail("for arguments", captureArgs());
    fail("for array like", arrayLike);
    msg(
        "fail with descriptive message",
        "[refute.isArrayLike] Expected [1, 2] not to be array like",
        [1, 2]
    );
    msg(
        "fail with custom message",
        "[refute.isArrayLike] Hey: Expected [1, 2] not to be array like",
        [1, 2],
        "Hey"
    );
    error(
        "for array like",
        {
            code: "ERR_ASSERTION",
            operator: "refute.isArrayLike"
        },
        arrayLike
    );
});
