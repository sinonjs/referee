"use strict";

function createCountAssertion(counts) {
    function countAssertion() {
        counts.asserts += 1;
    }

    return countAssertion;
}

module.exports = createCountAssertion;
