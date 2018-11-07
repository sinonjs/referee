"use strict";

function createVerify(referee) {
    function verify(expected) {
        var count = referee.count;

        referee.resetCount();

        if (
            typeof expected !== "undefined" &&
            (typeof expected !== "number" || expected < 1)
        ) {
            throw new TypeError("expected argument must be a number >= 1");
        }

        if (expected && count !== expected) {
            throw new Error(
                "Expected assertion count to be " +
                    expected +
                    " but was " +
                    count
            );
        }

        if (count === 0) {
            throw new Error(
                "Expected assertion count to be at least 1, but was 0"
            );
        }
    }

    return verify;
}

module.exports = createVerify;
