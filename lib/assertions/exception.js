"use strict";

var samsam = require("@sinonjs/samsam");
var hasOwnProperty =
  require("@sinonjs/commons").prototypes.object.hasOwnProperty;

var captureException = require("../capture-exception");

var typeNoExceptionMessage =
  "${customMessage}Expected ${expected} but no exception was thrown";
var typeFailMessage =
  "${customMessage}Expected ${expected} but threw ${actualExceptionType} (${actualExceptionMessage})\n${actualExceptionStack}";
var matchFailMessage =
  "${customMessage}Expected thrown ${actualExceptionType} (${actualExceptionMessage}) to pass matcher function";

module.exports = function (referee) {
  referee.captureException = captureException;

  referee.add("exception", {
    assert: function (callback) {
      var matcher = arguments[1];
      var customMessage = arguments[2];

      if (typeof matcher === "string") {
        customMessage = matcher;
        matcher = undefined;
      }

      this.expected = matcher;
      this.customMessage = customMessage;

      var err = captureException(callback);

      if (err) {
        this.actualExceptionType = err.name;
        this.actualExceptionMessage = err.message;
        this.actualExceptionStack = err.stack;
      }

      if (!err) {
        if (typeof matcher === "object") {
          return this.fail(typeNoExceptionMessage);
        }
        return this.fail("message");
      }

      if (typeof matcher === "object" && !samsam.match(err, matcher)) {
        var matches = false;
        var prop;
        for (prop in matcher) {
          if (hasOwnProperty(matcher, prop)) {
            if (!samsam.match(err[prop], matcher[prop])) {
              return this.fail(typeFailMessage);
            }
            matches = true;
          }
        }
        return matches;
      }

      if (typeof matcher === "function" && matcher(err) !== true) {
        return this.fail(matchFailMessage);
      }

      return true;
    },

    refute: function (callback) {
      var err = captureException(callback);

      if (err) {
        this.customMessage = arguments[1];
        this.actualExceptionType = err.name;
        this.actualExceptionMessage = err.message;
        return false;
      }

      return true;
    },

    expectation: "toThrow",
    assertMessage: "${customMessage}Expected exception",
    refuteMessage:
      "${customMessage}Expected not to throw but threw ${actualExceptionType} (${actualExceptionMessage})",
  });
};
