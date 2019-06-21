"use strict";

function createVerifier(referee) {
    function verifier() {
        var count = 0;
        var asyncCount = 0;

        function decrementAsyncCount() {
            asyncCount -= 1;
        }

        function incrementAsyncCount() {
            asyncCount += 1;
        }

        function incrementCount() {
            count += 1;
        }

        referee.on("pass", incrementCount);
        referee.on("failure", incrementCount);

        referee.on("async_added", incrementAsyncCount);
        referee.on("async_executed", decrementAsyncCount);

        function verify(expected) {
            referee.off("pass", incrementCount);
            referee.off("failure", incrementCount);
            referee.off("rejected", incrementCount);
            referee.off("async_added", incrementAsyncCount);
            referee.off("async_executed", decrementAsyncCount);

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

            if (expected && asyncCount > 0) {
                throw new Error(
                    "There are " + asyncCount + " pending async assertions"
                );
            }
        }

        Object.defineProperty(verify, "count", {
            get: function() {
                return count;
            }
        });

        Object.defineProperty(verify, "asyncCount", {
            get: function() {
                return asyncCount;
            }
        });

        return verify;
    }

    return verifier;
}

module.exports = createVerifier;
