"use strict";

var assert = require("assert");
var factory = require("./tag-name");
var sinon = require("sinon");

describe("tagName factory", function () {
  beforeEach(function () {
    this.fakeReferee = {
      add: sinon.fake(),
    };

    factory(this.fakeReferee);

    this.options = this.fakeReferee.add.args[0][1];
  });

  it("calls referee.add with 'isMap' as name", function () {
    assert(this.fakeReferee.add.calledWith("tagName"));
  });

  describe(".assert", function () {
    context("with object missing tagName", function () {
      it("invokes fail with 'no tag name' message", function () {
        this.options.fail = sinon.fake();

        this.options.assert({}, "li");

        sinon.assert.calledOnce(this.options.fail);
        sinon.assert.calledWith(
          this.options.fail,
          "${customMessage}Expected ${actualElement} to have tagName property"
        );
      });
    });

    context("with matching tag names", function () {
      it("returns true", function () {
        assert.equal(this.options.assert({ tagName: "li" }, "li"), true);
      });
    });

    context("with case-insensitive matching tag names", function () {
      it("returns true", function () {
        assert.equal(this.options.assert({ tagName: "LI" }, "li"), true);
      });
    });

    context("with case-insensitive matching tag names #2", function () {
      it("returns true", function () {
        assert.equal(this.options.assert({ tagName: "li" }, "LI"), true);
      });
    });

    if (typeof document !== "undefined") {
      context("with matching DOM elements", function () {
        it("returns true", function () {
          assert.equal(
            this.options.assert(document.createElement("li"), "li"),
            true
          );
        });
      });
    }

    context("with uppercase matching tag names", function () {
      it("returns true", function () {
        assert.equal(this.options.assert({ tagName: "LI" }, "LI"), true);
      });
    });

    context("with mismatched tag names", function () {
      it("returns false", function () {
        var t = this;
        var tagName = "1d83c5fe-b2f9-4711-9e7e-1633d59bf5b8";
        var nonMatchingValues = [
          { tagName: "23acdc5d-7f7e-42b1-a611-b1bbbef7a794" },
          { tagName: "7ee81413-9c89-45e6-8934-dff61ed17820" },
        ];

        if (typeof document !== "undefined") {
          nonMatchingValues.push(document.createElement("li"));
        }

        nonMatchingValues.forEach(function (value) {
          assert.equal(t.options.assert(value, tagName), false);
        });
      });
    });
  });

  describe(".assertMessage", function () {
    it("is '${customMessage}Expected tagName to be ${expected} but was ${actual}'", function () {
      assert.equal(
        this.options.assertMessage,
        "${customMessage}Expected tagName to be ${expected} but was ${actual}"
      );
    });
  });

  describe(".refuteMessage", function () {
    it("is '${customMessage}Expected tagName not to be ${actual}'", function () {
      assert.equal(
        this.options.refuteMessage,
        "${customMessage}Expected tagName not to be ${actual}"
      );
    });
  });

  describe(".expectation", function () {
    it("is 'toHaveTagName'", function () {
      assert.equal(this.options.expectation, "toHaveTagName");
    });
  });

  describe(".values", function () {
    it("is a ternary function", function () {
      assert.equal(typeof this.options.values, "function");
      assert.equal(this.options.values.length, 3);
    });

    it("returns a values object", function () {
      var element = "09088de3-966d-4359-bb14-9a308a2eefa4";
      var tagName = "e35b667b-5924-479b-9336-4649410ba012";
      var message = "42ac2ec5-cde8-4a9e-8871-50d77d78a28d";
      var result = this.options.values(element, tagName, message);

      assert.equal(typeof result, "object");
    });

    it("returns the element argument as the actualElement property", function () {
      var element = "e500905e-52a9-4f33-ba04-c38ab83031a9";
      var tagName = "8cef21db-a983-490a-a7db-4f022493f529";
      var message = "fa513aca-cda4-4462-9e14-b7beb4bd0e2d";
      var result = this.options.values(element, tagName, message);

      assert.equal(result.actualElement, element);
    });

    it("returns the element argument's tagName as the actual property", function () {
      var element = {
        tagName: "ba550a5b-2779-4c43-a7c2-4e23967052b5",
      };
      var tagName = "8cef21db-a983-490a-a7db-4f022493f529";
      var message = "fa513aca-cda4-4462-9e14-b7beb4bd0e2d";
      var result = this.options.values(element, tagName, message);

      assert.equal(result.actual, element.tagName);
    });

    it("returns the tagName argument as the expected property", function () {
      var element = "34668e7a-2b92-4390-ba18-b0a532614b14";
      var tagName = "817cf619-8e09-4f68-8450-0dc0b81cc7a8";
      var message = "ae6bfec7-d067-4299-aa46-388b6a5becdc";
      var result = this.options.values(element, tagName, message);

      assert.equal(result.expected, tagName);
    });

    it("returns the message argument as the customMessage property", function () {
      var element = "4365870b-e123-4dd0-910a-5176e4affd60";
      var tagName = "493c27b4-15d6-4c3e-9938-a3a2c5fe8d85";
      var message = "35144761-d76f-43b0-a462-aae9d22b3964";
      var result = this.options.values(element, tagName, message);

      assert.equal(result.customMessage, message);
    });
  });
});
