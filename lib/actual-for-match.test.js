"use strict";

const assert = require("assert");
const actualForMatch = require("./actual-for-match");

describe("actualForMatch", function () {
  it("should return actual if actual is not an object", function () {
    const result = actualForMatch(1, { bar: 2 });

    assert.equal(result, 1);
  });

  it("should return actual if match is not an object", function () {
    const result = actualForMatch({ foo: 1 }, 2);

    assert.deepEqual(result, { foo: 1 });
  });

  it("should return diff", function () {
    const diff = actualForMatch({ foo: 1 }, { bar: 2 });

    assert.deepEqual(diff, {
      bar: undefined,
    });
  });
});
