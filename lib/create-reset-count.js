"use strict";

function createResetCount(counts) {
    function resetCount() {
        counts.asserts = 0;
    }

    return resetCount;
}

module.exports = createResetCount;
