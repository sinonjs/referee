"use strict";

/**
 * @param {{on: (eventName: string, listener: () => void) => void, off: (eventName: string, listener: () => void) => void}} referee
 */
function createVerifier(referee) {
  /**
   *
   */
  function verifier() {
    var count = 0;

    /**
     * @returns {void}
     */
    function incrementCount() {
      count += 1;
    }

    referee.on("pass", incrementCount);
    referee.on("failure", incrementCount);

    /**
     * @param {number} expected
     */
    function verify(expected) {
      referee.off("pass", incrementCount);
      referee.off("failure", incrementCount);

      if (
        typeof expected !== "undefined" &&
        (typeof expected !== "number" || expected < 1)
      ) {
        throw new TypeError("expected argument must be a number >= 1");
      }

      if (expected && count !== expected) {
        throw new Error(
          `Expected assertion count to be ${expected} but was ${count}`,
        );
      }

      if (count === 0) {
        throw new Error("Expected assertion count to be at least 1, but was 0");
      }
    }

    Object.defineProperty(verify, "count", {
      get: function () {
        return count;
      },
    });

    return verify;
  }

  return verifier;
}

module.exports = createVerifier;
