/*
 * Demo error messages and diff rendering with Mocha.
 */
"use strict";

var assert = require("..").assert;

describe("diff", function () {
  it("multiline string", function () {
    assert.equals("foo\nbar\ndoo\n", "bar\ndoo\nxyz\n");
  });

  it("objects", function () {
    assert.equals({ foo: 42 }, { foo: 66 });
  });

  it("matchJson", function () {
    assert.matchJson('{"foo":42,"bar":true,"ignored":true}', {
      foo: 42,
      bar: false,
    });
  });
});
