"use strict";

var assert = require("assert");
var sinon = require("sinon");
var referee = require("./referee");
var allOff = require("event-emitter/all-off");

describe("custom assertions", function () {
  beforeEach(function () {
    sinon.spy(referee, "fail");
    this.okListener = sinon.spy();
    referee.on("pass", this.okListener);
    this.failListener = sinon.spy();
    referee.on("failure", this.failListener);
  });

  afterEach(function () {
    sinon.restore();
    allOff(referee);
    delete referee.throwOnFailure;

    delete referee.assert.custom;
    delete referee.refute.custom;
  });

  it("should expose properties on this as message values", function () {
    referee.add("custom", {
      assert: function (actual, expected) {
        this.actual = `${actual}?`;
        this.expected = `${expected}!`;
        return false;
      },
      assertMessage: "${actual} ${expected}",
      refuteMessage: "${actual} ${expected}",
    });

    try {
      referee.assert.custom(2, 3);
      throw new Error("Didn't throw");
    } catch (e) {
      referee.assert.equals("[assert.custom] '2?' '3!'", e.message);
    }
  });

  it("should format interpolated property", function () {
    var expectedMessage = "[assert.custom] '2?' '3!'";
    var actualMessage;

    referee.add("custom", {
      assert: function (actual, expected) {
        this.actual = `${actual}?`;
        this.expected = `${expected}!`;
        return false;
      },
      assertMessage: "${actual} ${expected}",
      refuteMessage: "${actual} ${expected}",
    });

    try {
      referee.assert.custom(2, 3);
      // eslint-disable-next-line no-empty
    } catch (e) {
      actualMessage = e.message;
    }

    referee.assert.equals(actualMessage, expectedMessage);
  });

  it("should not expose fail property", function () {
    referee.add("custom", {
      // eslint-disable-next-line no-unused-vars
      assert: function (actual) {
        return false;
      },
      assertMessage: "${fail}",
      refuteMessage: "${fail}",
    });

    try {
      referee.assert.custom(2, 3);
      throw new Error("Didn't throw");
    } catch (e) {
      referee.assert.equals("[assert.custom] ${fail}", e.message);
    }
  });

  it("should not leak properties between calls", function () {
    var i = 0;

    referee.add("custom", {
      // eslint-disable-next-line no-unused-vars
      assert: function (actual) {
        if (i === 0) {
          this.actual = "A";
        } else {
          this.expected = "B";
        }

        i++;
        return false;
      },
      assertMessage: "${actual} ${expected}",
      refuteMessage: "${actual} ${expected}",
    });

    try {
      referee.assert.custom(4, 5);
      // eslint-disable-next-line no-empty
    } catch (e) {}

    try {
      referee.assert.custom(2, 3);
      throw new Error("Didn't throw");
    } catch (err) {
      referee.assert.equals("[assert.custom] ${actual} 'B'", err.message);
    }
  });

  it("should interpolate same property multiple times", function () {
    referee.add("custom", {
      assert: function (actual) {
        this.actual = `${actual}?`;
        return false;
      },
      assertMessage: "${actual} ${actual}",
      refuteMessage: "${actual} ${actual}",
    });

    try {
      referee.assert.custom(2, 3);
      throw new Error("Didn't throw");
    } catch (e) {
      referee.assert.equals("[assert.custom] '2?' '2?'", e.message);
    }
  });

  it("should interpolate numeric placeholders multiple times", function () {
    referee.add("custom", {
      assert: function (actual) {
        this.actual = `${actual}?`;
        return false;
      },
      assertMessage: "${0} ${0}",
      refuteMessage: "${0} ${0}",
    });

    try {
      referee.assert.custom(2, 3);
      throw new Error("Didn't throw");
    } catch (e) {
      referee.assert.equals("[assert.custom] 2 2", e.message);
    }
  });

  it("should not escape ! placeholders with string values", function () {
    referee.add("custom", {
      assert: function (actual) {
        this.actual = actual;
        this.alreadyFormatted = "test";
        return false;
      },
      assertMessage: "unquoted ${!alreadyFormatted}",
      refuteMessage: "ignored",
    });

    try {
      referee.assert.custom(2, 3);
      throw new Error("Didn't throw");
    } catch (e) {
      referee.assert.equals("[assert.custom] unquoted test", e.message);
    }
  });

  it("should interpolate ... placeholders with array value", function () {
    referee.add("custom", {
      assert: function (actual) {
        this.actual = actual;
        this.args = [1, 2];
        return false;
      },
      assertMessage: "with args ${...args}",
      refuteMessage: "ignored",
    });

    try {
      referee.assert.custom(2, 3);
      throw new Error("Didn't throw");
    } catch (e) {
      referee.assert.equals("[assert.custom] with args 1, 2", e.message);
    }
  });

  it("should interpolate ... placeholders with object value", function () {
    referee.add("custom", {
      assert: function (actual) {
        this.actual = actual;
        this.args = { some: 42 };
        return false;
      },
      assertMessage: "with args ${...args}",
      refuteMessage: "ignored",
    });

    try {
      referee.assert.custom(2, 3);
      throw new Error("Didn't throw");
    } catch (e) {
      referee.assert.equals(
        "[assert.custom] with args { some: 42 }",
        e.message
      );
    }
  });

  it("should add expectation if expect property is set", function () {
    referee.add("custom", {
      assert: function (actual) {
        return actual === "foo";
      },
      assertMessage: "Expected ${1} to be foo!",
      refuteMessage: "Expected not to be foo!",
      expectation: "toBeFoo",
    });

    referee.expect("foo").toBeFoo();
  });

  it("should not throw if Promise is not defined", function () {
    // Let sinon restore global.Promise:
    // eslint-disable-next-line no-empty-function
    sinon.replace(global, "Promise", function () {});
    delete global.Promise;

    referee.add("custom", {
      assert: function (actual) {
        return Boolean(actual);
      },
      assertMessage: "${0} ${0}",
      refuteMessage: "${0} ${0}",
    });

    assert.doesNotThrow(function () {
      referee.assert.custom(1);
    });
  });

  it("should not throw if values function throws", function () {
    referee.add("custom", {
      assert: function (actual) {
        return Boolean(actual);
      },
      assertMessage: "${0} ${0}",
      refuteMessage: "${0} ${0}",
      values: function () {
        throw new Error("Oups!");
      },
    });

    assert.doesNotThrow(function () {
      referee.assert.custom(1);
    });
  });

  context("when assertMessage is a function", function () {
    it("uses the returned value", function () {
      referee.add("custom", {
        assert: function (actual) {
          return Boolean(actual);
        },
        assertMessage: function () {
          return "assertMessage from a function";
        },
      });

      try {
        referee.assert.custom(false);
        throw new Error("Didn't throw");
      } catch (err) {
        referee.assert.equals(
          "[assert.custom] assertMessage from a function",
          err.message
        );
      }
    });

    it("interpolates with the returned value", function () {
      referee.add("custom", {
        assert: function (actual, expected) {
          return Boolean(actual && expected);
        },
        assertMessage: function () {
          return "${actual} definitely not ${expected}";
        },
        values: function spyAndCalls() {
          return {
            actual: arguments[0],
            expected: arguments[1],
          };
        },
      });

      try {
        referee.assert.custom(false, true);
        throw new Error("Didn't throw");
      } catch (err) {
        referee.assert.equals(
          "[assert.custom] false definitely not true",
          err.message
        );
      }
    });
  });

  context("when refuteMessage is a function", function () {
    it("uses the returned value", function () {
      referee.add("custom", {
        assert: function (actual) {
          return Boolean(actual);
        },
        refuteMessage: function () {
          return "refuteMessage from a function";
        },
      });

      try {
        referee.assert.custom(true);
        throw new Error("Didn't throw");
      } catch (err) {
        referee.refute.equals(
          "[refute.custom] refuteMessage from a function",
          err.message
        );
      }
    });

    it("interpolates with the returned value", function () {
      referee.add("custom", {
        assert: function (notUsed) {
          return notUsed;
        },
        refute: function (actual, expected) {
          return Boolean(actual && expected);
        },
        refuteMessage: function () {
          return "${actual} definitely not ${expected}";
        },
        values: function spyAndCalls() {
          return {
            actual: arguments[0],
            expected: arguments[1],
          };
        },
      });

      try {
        referee.refute.custom(false, true);
        throw new Error("Didn't throw");
      } catch (err) {
        referee.assert.equals(
          "[refute.custom] false definitely not true",
          err.message
        );
      }
    });
  });
});
