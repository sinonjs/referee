"use strict";

const assert = require("assert");
const referee = require("../referee");

describe("assert.exception", function () {
  it("passes when callback throws", function () {
    referee.assert.exception(function () {
      throw new Error();
    });
  });

  it("fails when callback does not throw", function () {
    try {
      referee.assert.exception(function () {
        return undefined;
      });
    } catch (error) {
      assert.equal(error.message, "[assert.exception] Expected exception");
    }
  });

  it("passes when callback throws expected name", function () {
    referee.assert.exception(
      function () {
        throw new TypeError("Oh hmm");
      },
      { name: "TypeError" }
    );
  });

  it("fails when callback does not throw expected name", function () {
    try {
      referee.assert.exception(
        function () {
          throw new Error();
        },
        { name: "TypeError" }
      );
    } catch (error) {
      assert(
        error.message.startsWith(
          "[assert.exception] Expected { name: 'TypeError' } but threw 'Error' ('')"
        )
      );
    }
  });

  it("fails when thrown message does not match", function () {
    try {
      referee.assert.exception(
        function () {
          throw new Error("Aright");
        },
        { message: "Aww" }
      );
    } catch (error) {
      assert(
        error.message.startsWith(
          "[assert.exception] Expected { message: 'Aww' } but threw 'Error' ('Aright')"
        )
      );
    }
  });

  it("passes when message and type matches", function () {
    referee.assert.exception(
      function () {
        throw new TypeError("Aright");
      },
      { name: "Type", message: "Ar" }
    );
  });

  it("when callback does not throw and specific type is expected", function () {
    try {
      referee.assert.exception(
        function () {
          return undefined;
        },
        { name: "TypeError" }
      );
    } catch (error) {
      assert.equal(
        error.message,
        "[assert.exception] Expected { name: 'TypeError' } but no exception was thrown"
      );
    }
  });

  it("fails with custom message", function () {
    try {
      referee.assert.exception(function () {
        return undefined;
      }, "Hmm");
    } catch (error) {
      assert.equal(error.message, "[assert.exception] Hmm: Expected exception");
    }
  });

  it("fails with matcher and custom message", function () {
    try {
      referee.assert.exception(
        function () {
          return undefined;
        },
        { name: "TypeError" },
        "Hmm"
      );
    } catch (error) {
      assert.equal(
        error.message,
        "[assert.exception] Hmm: Expected { name: 'TypeError' } but no exception was thrown"
      );
    }
  });

  it("passes when matcher function returns true", function () {
    referee.assert.exception(
      function () {
        throw new TypeError("Aright");
      },
      function (err) {
        return err.name === "TypeError";
      }
    );
  });

  it("fails when matcher function returns truthy", function () {
    try {
      referee.assert.exception(
        function () {
          return undefined;
        },
        function (err) {
          return err.name;
        }
      );
    } catch (error) {
      assert.equal(error.message, "[assert.exception] Expected exception");
    }
  });

  it("fails when matcher function returns false", function () {
    try {
      referee.assert.exception(
        function () {
          throw new TypeError("Aright");
        },
        function (err) {
          return err.name === "Error";
        }
      );
    } catch (error) {
      assert.equal(
        error.message,
        "[assert.exception] Expected thrown 'TypeError' ('Aright') to pass matcher function"
      );
    }
  });

  it("fails when not passed arguments", function () {
    try {
      referee.assert.exception();
    } catch (error) {
      assert.equal(
        error.message,
        "[assert.exception] Expected to receive at least 1 argument(s)"
      );
    }
  });

  it("passes when matcher regexp matches", function () {
    referee.assert.exception(function () {
      throw new TypeError("Aright");
    }, /right/);
  });

  it("fails when matcher regexp does not match", function () {
    try {
      referee.assert.exception(function () {
        throw new TypeError("Aright");
      }, /nope/);
    } catch (error) {
      assert.equal(error.message, "[assert.exception] Expected exception");
    }
  });

  it("passes when non own property of object does not match", function () {
    function Matcher() {
      this.name = "TypeError";
    }
    Matcher.prototype.message = "Nope";

    referee.assert.exception(function () {
      throw new TypeError("Aright");
    }, new Matcher());
  });
});

describe("refute.exception", function () {
  it("fails when callback throws", function () {
    try {
      referee.refute.exception(function () {
        throw new Error("Yo, Malcolm");
      });
    } catch (error) {
      assert.equal(
        error.message,
        "[refute.exception] Expected not to throw but threw 'Error' ('Yo, Malcolm')"
      );
    }
  });

  it("passes when callback does not throw", function () {
    referee.refute.exception(function () {
      return undefined;
    });
  });

  it("passes with message when callback does not throw", function () {
    referee.refute.exception(function () {
      return undefined;
    }, "Oh noes");
  });

  it("fails with message", function () {
    try {
      referee.refute.exception(function () {
        throw new Error(":(");
      });
    } catch (error) {
      assert.equal(
        error.message,
        "[refute.exception] Expected not to throw but threw 'Error' (':(')"
      );
    }
  });

  it("fails with custom message", function () {
    try {
      referee.refute.exception(function () {
        throw new Error(":(");
      }, "Jeez");
    } catch (error) {
      assert.equal(
        error.message,
        "[refute.exception] Jeez: Expected not to throw but threw 'Error' (':(')"
      );
    }
  });

  it("fails when not passed arguments", function () {
    try {
      referee.refute.exception();
    } catch (error) {
      assert.equal(
        error.message,
        "[refute.exception] Expected to receive at least 1 argument(s)"
      );
    }
  });
});
