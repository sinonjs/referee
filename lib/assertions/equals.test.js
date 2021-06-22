"use strict";

var captureArgs = require("../test-helper/capture-args");
var referee = require("../referee");
var inspect = require("util").inspect;
var assert = require("assert");

var obj = { id: 42 };
// eslint-disable-next-line no-empty-function
var func = function () {};
var arr = [];
var date = new Date();
var sameDate = new Date(date.getTime());
var anotherDate = new Date(date.getTime() - 10);

describe("assert.equals", function () {
  it("should pass when comparing object with itself", function () {
    referee.assert.equals(obj, obj);
  });

  it("should pass when comparing strings", function () {
    referee.assert.equals("Hey", "Hey");
  });

  it("should pass when comparing numbers", function () {
    referee.assert.equals(32, 32);
  });

  it("should pass when comparing booleans", function () {
    referee.assert.equals(false, false);
  });

  it("should pass when comparing null", function () {
    referee.assert.equals(null, null);
  });

  it("should fail when comparing undefined", function () {
    assert.throws(
      function () {
        referee.assert.equals(undefined, undefined);
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] Expectation for equals should not be undefined. Use assert.isUndefined instead."
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });

  it("should pass when comparing func to itself", function () {
    referee.assert.equals(func, func);
  });

  it("should fail when comparing functions", function () {
    // eslint-disable-next-line no-empty-function
    var functionA = function () {};
    // eslint-disable-next-line no-empty-function
    var functionB = function () {};

    assert.throws(
      function () {
        referee.assert.equals(functionA, functionB);
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.equals] ${inspect(
            functionA
          )} expected to be equal to ${inspect(functionB)}`
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });

  it("should pass when comparing array to itself", function () {
    referee.assert.equals(arr, arr);
  });

  it("should pass when comparing date objects with same date", function () {
    referee.assert.equals(date, sameDate);
  });

  it("should fail when comparing date objects with different dates", function () {
    assert.throws(
      function () {
        referee.assert.equals(date, anotherDate);
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.equals] ${date.toISOString()} expected to be equal to ${anotherDate.toISOString()}`
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });

  it("should pass when comparing date objects to null", function () {
    assert.throws(
      function () {
        referee.assert.equals(date, null);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.equals] ${date.toISOString()} expected to be equal to null`
        );
        assert.equal(error.operator, "assert.equals");
        assert.equal(error.name, "AssertionError");
        return true;
      }
    );
  });

  it("should fail when comparing strings and numbers with coercion", function () {
    assert.throws(
      function () {
        referee.assert.equals("4", 4);
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] '4' expected to be equal to 4"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });
  it("should fail when comparing number and string with coercion", function () {
    assert.throws(
      function () {
        referee.assert.equals(4, "4");
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] 4 expected to be equal to '4'"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });

  it("should fail when comparing number object with coercion", function () {
    assert.throws(
      function () {
        // eslint-disable-next-line no-new-wrappers
        referee.assert.equals(32, new Number(32));
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] 32 expected to be equal to [Number: 32]"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });

  it("should fail when comparing number object reverse with coercion", function () {
    assert.throws(
      function () {
        // eslint-disable-next-line no-new-wrappers
        referee.assert.equals(new Number(32), 32);
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] [Number: 32] expected to be equal to 32"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });

  it("should fail when comparing falsy values with coercion", function () {
    assert.throws(
      function () {
        referee.assert.equals(0, "");
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] 0 expected to be equal to ''"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });

  it("should fail when comparing falsy values reverse with coercion", function () {
    assert.throws(
      function () {
        referee.assert.equals("", 0);
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] '' expected to be equal to 0"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });

  it("should fail when comparing string boxing with coercion", function () {
    assert.throws(
      function () {
        // eslint-disable-next-line no-new-wrappers
        referee.assert.equals("4", new String("4"));
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] '4' expected to be equal to [String: '4']"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });

  it("should fail when comparing string boxing reverse with coercion", function () {
    assert.throws(
      function () {
        // eslint-disable-next-line no-new-wrappers
        referee.assert.equals(new String("4"), "4");
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] [String: '4'] expected to be equal to '4'"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });

  it("should pass when comparing NaN to NaN", function () {
    referee.assert.equals(NaN, NaN);
  });

  it("should fail when comparing -0 and +0", function () {
    assert.throws(
      function () {
        referee.assert.equals(-0, +0);
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] -0 expected to be equal to 0"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });

  it("should fail when comparing objects with different own properties", function () {
    assert.throws(
      function () {
        referee.assert.equals({ id: 42 }, { id: 42, di: 24 });
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] { id: 42 } expected to be equal to { id: 42, di: 24 }"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });

  it("should fail when comparing objects with different own properties #2", function () {
    assert.throws(
      function () {
        referee.assert.equals({ id: undefined }, { di: 24 });
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] { id: undefined } expected to be equal to { di: 24 }"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });

  it("should fail when comparing objects with different own properties #3", function () {
    assert.throws(
      function () {
        referee.assert.equals({ id: 24 }, { id: undefined });
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] { id: 24 } expected to be equal to { id: undefined }"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });

  it("should pass when comparing with one property", function () {
    referee.assert.equals({ id: 42 }, { id: 42 });
  });

  it("should pass when comparing objects with one property", function () {
    referee.assert.equals({ obj: { id: 42 } }, { obj: { id: 42 } });
  });

  it("should fail when comparing objects with one property with different values", function () {
    assert.throws(
      function () {
        referee.assert.equals({ id: 42 }, { id: 24 });
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] { id: 42 } expected to be equal to { id: 24 }"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });

  it("should pass when comparing complex objects", function () {
    var deepObject = {
      id: 42,
      name: "Hey",
      sayIt: function () {
        return this.name;
      },

      child: {
        // eslint-disable-next-line no-empty-function
        speaking: function () {},
      },
    };

    referee.assert.equals(deepObject, {
      sayIt: deepObject.sayIt,
      child: { speaking: deepObject.child.speaking },
      id: 42,
      name: "Hey",
    });
  });

  it("should pass when comparing arrays", function () {
    referee.assert.equals(
      [1, 2, "Hey there", func, { id: 42, prop: [2, 3] }],
      [1, 2, "Hey there", func, { id: 42, prop: [2, 3] }]
    );
  });

  it("should pass when comparing regexp literals", function () {
    referee.assert.equals(/a/, /a/);
  });

  it("should pass when comparing regexp objects ", function () {
    referee.assert.equals(new RegExp("[a-z]+"), new RegExp("[a-z]+"));
  });

  it("should fail when comparing nested array with shallow array", function () {
    assert.throws(
      function () {
        referee.assert.equals([["hey"]], ["hey"]);
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] [ [ 'hey' ] ] expected to be equal to [ 'hey' ]"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });

  it("should fail when comparing regexp objects with custom properties", function () {
    var re1 = new RegExp("[a-z]+");
    var re2 = new RegExp("[a-z]+");
    re2.id = 42;

    assert.throws(
      function () {
        referee.assert.equals(re1, re2);
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] /[a-z]+/ expected to be equal to /[a-z]+/ { id: 42 }"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });
  it("should fail when comparing different objects", function () {
    assert.throws(
      function () {
        referee.assert.equals({ id: 42 }, {});
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] { id: 42 } expected to be equal to {}"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });
  it("should fail when comparing object to null", function () {
    assert.throws(
      function () {
        referee.assert.equals({}, null);
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] {} expected to be equal to null"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });
  it("should fail when comparing object to undefined", function () {
    assert.throws(
      function () {
        referee.assert.equals({}, undefined);
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] Expectation for equals should not be undefined. Use assert.isUndefined instead."
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });
  it("should fail when comparing object to false", function () {
    assert.throws(
      function () {
        referee.assert.equals({}, false);
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] {} expected to be equal to false"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });
  it("should fail when comparing false to object", function () {
    assert.throws(
      function () {
        referee.assert.equals(false, {});
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] false expected to be equal to {}"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });
  it("should fail when comparing object to true", function () {
    assert.throws(
      function () {
        referee.assert.equals({}, true);
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] {} expected to be equal to true"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });
  it("should fail when comparing true to object", function () {
    assert.throws(
      function () {
        referee.assert.equals(true, {});
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] true expected to be equal to {}"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });
  it("should fail when comparing 'empty' object to date", function () {
    assert.throws(
      function () {
        referee.assert.equals({}, date);
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.equals] {} expected to be equal to ${date.toISOString()}`
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });

  it("should fail when comparing 'empty' object to string object", function () {
    assert.throws(
      function () {
        // eslint-disable-next-line no-new-wrappers
        referee.assert.equals({}, new String());
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] {} expected to be equal to [String: '']"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });

  it("should fail when comparing 'empty' object to number object", function () {
    assert.throws(
      function () {
        // eslint-disable-next-line no-new-wrappers
        referee.assert.equals({}, new Number());
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] {} expected to be equal to [Number: 0]"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });

  it("should fail when comparing 'empty' object to empty array", function () {
    assert.throws(
      function () {
        referee.assert.equals({}, []);
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] {} expected to be equal to []"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });

  var arrayLike = { length: 4, 0: 1, 1: 2, 2: {}, 3: [] };

  it("should pass when comparing empty arguments to empty array", function () {
    referee.assert.equals(captureArgs(), []);
  });

  it("should fail when comparing empty array to empty arguments", function () {
    assert.throws(
      function () {
        referee.assert.equals([], captureArgs());
      },
      function (error) {
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] [] expected to be equal to [Arguments] {}"
        );
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });

  it("should pass when comparing arguments with elements to array with equal elements", function () {
    referee.assert.equals(captureArgs(1, 2, {}, []), [1, 2, {}, []]);
  });

  it("should pass when comparing arguments to array like object", function () {
    referee.assert.equals(captureArgs(1, 2, {}, []), arrayLike);
  });

  it("should fail when comparing different strings", function () {
    assert.throws(
      function () {
        referee.assert.equals({}, "Hey", "Here:");
      },
      function (error) {
        assert.equal(
          error.message,
          "[assert.equals] Here: {} expected to be equal to 'Hey'"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });

  it("should fail for multi-line strings with more than one newline", function () {
    assert.throws(
      function () {
        referee.assert.equals("Yo!\nMulti-\nline", "Yo!\nMultiline");
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.equals] 'Yo!\\nMulti-\\nline' expected to be equal to 'Yo!\\nMultiline'"
        );
        assert.equal(error.operator, "assert.equals");
        assert.equal(error.name, "AssertionError");
        return true;
      }
    );
  });

  it("should fail with custom message", function () {
    assert.throws(
      function () {
        referee.assert.equals({}, "Hey!", "Eh?");
      },
      function (error) {
        assert.equal(
          error.message,
          `[assert.equals] Eh? {} expected to be equal to 'Hey!'`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "assert.equals");
        return true;
      }
    );
  });
});

describe("assert.refute", function () {
  it("should fail when comparing object to itself", function () {
    assert.throws(
      function () {
        referee.refute.equals(obj, obj);
      },
      function (error) {
        assert.equal(
          error.message,
          "[refute.equals] { id: 42 } expected not to be equal to { id: 42 }"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "refute.equals");
        return true;
      }
    );
  });

  it("should fail when comparing strings", function () {
    assert.throws(
      function () {
        referee.refute.equals("Hey", "Hey");
      },
      function (error) {
        assert.equal(
          error.message,
          "[refute.equals] 'Hey' expected not to be equal to 'Hey'"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "refute.equals");
        return true;
      }
    );
  });

  it("should fail when comparing numbers", function () {
    assert.throws(
      function () {
        referee.refute.equals(32, 32);
      },
      function (error) {
        assert.equal(
          error.message,
          "[refute.equals] 32 expected not to be equal to 32"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "refute.equals");
        return true;
      }
    );
  });

  it("should fail when comparing booleans", function () {
    assert.throws(
      function () {
        referee.refute.equals(false, false);
      },
      function (error) {
        assert.equal(
          error.message,
          "[refute.equals] false expected not to be equal to false"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "refute.equals");
        return true;
      }
    );
  });

  it("should fail when comparing null", function () {
    assert.throws(
      function () {
        referee.refute.equals(null, null);
      },
      function (error) {
        assert.equal(
          error.message,
          "[refute.equals] null expected not to be equal to null"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "refute.equals");
        return true;
      }
    );
  });

  it("should fail when comparing undefined", function () {
    assert.throws(
      function () {
        referee.refute.equals(undefined, undefined);
      },
      function (error) {
        assert.equal(
          error.message,
          "[refute.equals] Expectation for equals should not be undefined. Use assert.isUndefined instead."
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "refute.equals");
        return true;
      }
    );
  });

  it("should fail when comparing function to itself", function () {
    assert.throws(
      function () {
        referee.refute.equals(func, func);
      },
      function (error) {
        assert.equal(
          error.message,
          "[refute.equals] [Function: func] expected not to be equal to [Function: func]"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "refute.equals");
        return true;
      }
    );
  });

  it("should pass when comparing function", function () {
    // eslint-disable-next-line no-empty-function
    var functionA = function () {};
    // eslint-disable-next-line no-empty-function
    var functionB = function () {};
    referee.refute.equals(functionA, functionB);
  });

  it("should fail when comparing array to itself", function () {
    assert.throws(
      function () {
        referee.refute.equals(arr, arr);
      },
      function (error) {
        assert.equal(
          error.message,
          "[refute.equals] [] expected not to be equal to []"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "refute.equals");
        return true;
      }
    );
  });

  it("should fail when comparing date objects with same date", function () {
    assert.throws(
      function () {
        referee.refute.equals(date, sameDate);
      },
      function (error) {
        assert.equal(
          error.message,
          `[refute.equals] ${date.toISOString()} expected not to be equal to ${sameDate.toISOString()}`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "refute.equals");
        return true;
      }
    );
  });

  it("should pass when comparing date objects with different dates", function () {
    referee.refute.equals(date, anotherDate);
  });

  it("should pass when comparing date objects to null", function () {
    referee.refute.equals(new Date(), null);
  });

  it("should pass when comparing string with number with coercion", function () {
    referee.refute.equals("4", 4);
  });

  it("should pass when comparing number with string with coercion", function () {
    referee.refute.equals(32, "32");
  });

  it("should pass when comparing with coercion", function () {
    referee.refute.equals(0, "");
  });

  it("should pass when comparing objects with different own properties", function () {
    referee.refute.equals({ id: 42 }, { id: 42, di: 24 });
  });

  it("should pass when comparing objects with different own properties #2", function () {
    referee.refute.equals({ id: undefined }, { di: 24 });
  });

  it("should pass when comparing objects with different own properties #3", function () {
    referee.refute.equals({ id: 24 }, { di: undefined });
  });

  it("should fail when comparing objects with one property", function () {
    assert.throws(
      function () {
        referee.refute.equals({ id: 42 }, { id: 42 });
      },
      function (error) {
        assert.equal(
          error.message,
          `[refute.equals] { id: 42 } expected not to be equal to { id: 42 }`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "refute.equals");
        return true;
      }
    );
  });

  it("should fail when comparing objects with one object property", function () {
    assert.throws(
      function () {
        referee.refute.equals({ obj: { id: 42 } }, { obj: { id: 42 } });
      },
      function (error) {
        assert.equal(
          error.message,
          `[refute.equals] { obj: { id: 42 } } expected not to be equal to { obj: { id: 42 } }`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "refute.equals");
        return true;
      }
    );
  });

  it("should pass when comparing objects with one property with different values", function () {
    referee.refute.equals({ id: 42 }, { id: 24 });
  });

  it("should fail when comparing NaN to NaN", function () {
    assert.throws(
      function () {
        referee.refute.equals(NaN, NaN);
      },
      function (error) {
        assert.equal(
          error.message,
          `[refute.equals] NaN expected not to be equal to NaN`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "refute.equals");
        return true;
      }
    );
  });

  it("should pass when comparing -0 to +0", function () {
    referee.refute.equals(-0, +0);
  });

  it("should fail when comparing complex objects", function () {
    var deepObject = {
      id: 42,
      name: "Hey",
      sayIt: function () {
        return this.name;
      },

      child: {
        // eslint-disable-next-line no-empty-function
        speaking: function () {},
      },
    };

    const complexObject = {
      sayIt: deepObject.sayIt,
      child: { speaking: deepObject.child.speaking },
      id: 42,
      name: "Hey",
    };
    assert.throws(
      function () {
        referee.refute.equals(deepObject, complexObject);
      },
      function (error) {
        assert.equal(
          error.message,
          `[refute.equals] ${inspect(
            deepObject
          )} expected not to be equal to ${inspect(complexObject)}`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "refute.equals");
        return true;
      }
    );
  });

  var arr1 = [1, 2, "Hey there", func, { id: 42, prop: [2, 3] }];
  var arr2 = [1, 2, "Hey there", func, { id: 42, prop: [2, 3] }];

  it("should fail when comparing arrays", function () {
    assert.throws(
      function () {
        referee.refute.equals(arr1, arr2);
      },
      function (error) {
        assert.equal(
          error.message,
          `[refute.equals] [ 1, 2, 'Hey there', [Function: func], { id: 42, prop: [ 2, 3 ] } ] expected not to be equal to [ 1, 2, 'Hey there', [Function: func], { id: 42, prop: [ 2, 3 ] } ]`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "refute.equals");
        return true;
      }
    );
  });

  it("should fail when comparing regexp literals", function () {
    assert.throws(
      function () {
        referee.refute.equals(/a/, /a/);
      },
      function (error) {
        assert.equal(
          error.message,
          `[refute.equals] /a/ expected not to be equal to /a/`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "refute.equals");
        return true;
      }
    );
  });

  it("should fail when comparing regexp objects", function () {
    assert.throws(
      function () {
        referee.refute.equals(new RegExp("[a-z]+"), new RegExp("[a-z]+"));
      },
      function (error) {
        assert.equal(
          error.message,
          `[refute.equals] /[a-z]+/ expected not to be equal to /[a-z]+/`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "refute.equals");
        return true;
      }
    );
  });

  it("should pass when comparing regexp objects with custom properties", function () {
    var re1 = new RegExp("[a-z]+");
    var re2 = new RegExp("[a-z]+");
    re2.id = 42;

    referee.refute.equals(re1, re2);
  });

  it("should pass when comparing different objects", function () {
    referee.refute.equals(obj, {});
  });

  it("should pass when comparing object to null", function () {
    referee.refute.equals({}, null);
  });

  it("should pass when comparing null to object", function () {
    referee.refute.equals(null, {});
  });

  it("should fail when comparing object to undefined", function () {
    assert.throws(
      function () {
        referee.refute.equals({}, undefined);
      },
      function (error) {
        assert.equal(
          error.message,
          `[refute.equals] Expectation for equals should not be undefined. Use assert.isUndefined instead.`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "refute.equals");
        return true;
      }
    );
  });

  it("should pass when comparing undefined to object", function () {
    referee.refute.equals(undefined, {});
  });

  it("should pass when comparing object to false", function () {
    referee.refute.equals({}, false);
  });

  it("should pass when comparing false to object", function () {
    referee.refute.equals(false, {});
  });

  it("should pass when comparing object to true", function () {
    referee.refute.equals({}, true);
  });

  it("should pass when comparing true to object", function () {
    referee.refute.equals(true, {});
  });

  it("should pass when comparing 'empty' object to date", function () {
    referee.refute.equals({}, new Date());
  });

  it("should pass when comparing 'empty' object to string object", function () {
    // eslint-disable-next-line no-new-wrappers
    referee.refute.equals({}, new String());
  });

  it("should pass when comparing 'empty' object to number object", function () {
    // eslint-disable-next-line no-new-wrappers
    referee.refute.equals({}, new Number());
  });

  it("should pass when comparing 'empty' object to empty array", function () {
    referee.refute.equals({}, []);
  });

  it("should pass when comparing multi-line strings", function () {
    referee.refute.equals("Hey\nHo", "Yo\nNo");
  });

  var arrayLike = { length: 4, 0: 1, 1: 2, 2: {}, 3: [] };

  it("should fail when comparing arguments with elements to array with equal elements", function () {
    assert.throws(
      function () {
        referee.refute.equals(captureArgs(1, 2, {}, []), [1, 2, {}, []]);
      },
      function (error) {
        assert.equal(
          error.message,
          `[refute.equals] [Arguments] { '0': 1, '1': 2, '2': {}, '3': [] } expected not to be equal to [ 1, 2, {}, [] ]`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "refute.equals");
        return true;
      }
    );
  });

  it("should fail when comparing empty arguments to empty array", function () {
    assert.throws(
      function () {
        referee.refute.equals(captureArgs(), []);
      },
      function (error) {
        assert.equal(
          error.message,
          `[refute.equals] [Arguments] {} expected not to be equal to []`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "refute.equals");
        return true;
      }
    );
  });

  it("when comparing empty array to empty arguments", function () {
    referee.refute.equals([], captureArgs());
  });

  it("should fail when comparing arguments to array like object", function () {
    assert.throws(
      function () {
        referee.refute.equals(captureArgs(1, 2, {}, []), arrayLike);
      },
      function (error) {
        assert.equal(
          error.message,
          `[refute.equals] [Arguments] { '0': 1, '1': 2, '2': {}, '3': [] } expected not to be equal to { '0': 1, '1': 2, '2': {}, '3': [], length: 4 }`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "refute.equals");
        return true;
      }
    );
  });

  it("should fail with custom message", function () {
    assert.throws(
      function () {
        referee.refute.equals({}, {}, "Eh?");
      },
      function (error) {
        assert.equal(
          error.message,
          `[refute.equals] Eh? {} expected not to be equal to {}`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.operator, "refute.equals");
        return true;
      }
    );
  });
});
