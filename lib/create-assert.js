"use strict";

var assertArgNum = require("./assert-arg-num");

function createAssert(referee, countAssertion) {
    function assert(actual, message) {
        countAssertion();
        if (!assertArgNum(referee.fail, "assert", arguments, 1)) {
            return;
        }

        if (!actual) {
            referee.fail(
                message ||
                    "[assert] Expected " + String(actual) + " to be truthy"
            );
            return;
        }

        referee.emit("pass", "assert", message || "", actual);
    }

    assert.toString = function() {
        return "referee.assert()";
    };

    return assert;
}

module.exports = createAssert;
