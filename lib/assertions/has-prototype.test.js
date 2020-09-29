"use strict";

var assert = require("assert");
var inspect = require("util").inspect;
var referee = require("../referee");

function MyThing() {}
var myThing = new MyThing();
var otherThing = {};
function F() {}
F.prototype = myThing;
var specializedThing = new F();

var myThingString = inspect(MyThing.prototype);

describe("assert.hasPrototype", function() {
    it("should fail when object does not inherit from prototype", function() {
        assert.throws(
            function() {
                referee.assert.hasPrototype(otherThing, MyThing.prototype);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.hasPrototype] Expected {} to have " +
                        myThingString +
                        " on its prototype chain"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.hasPrototype");
                return true;
            }
        );
    });

    it("should fail when primitive does not inherit from prototype", function() {
        assert.throws(
            function() {
                referee.assert.hasPrototype(3, MyThing.prototype);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.hasPrototype] Expected 3 to have " +
                        myThingString +
                        " on its prototype chain"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.hasPrototype");
                return true;
            }
        );
    });

    it("should fail with no arguments", function() {
        assert.throws(
            function() {
                referee.assert.hasPrototype();
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.hasPrototype] Expected to receive at least 2 argument(s)"
                );
                assert.equal(error.name, "AssertionError");
                return true;
            }
        );
    });

    it("should fail with only one object", function() {
        assert.throws(
            function() {
                referee.assert.hasPrototype({});
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.hasPrototype] Expected to receive at least 2 argument(s)"
                );
                assert.equal(error.name, "AssertionError");
                return true;
            }
        );
    });

    it("should pass when object has other object on prototype chain", function() {
        referee.assert.hasPrototype(myThing, MyThing.prototype);
    });

    it("should pass when object has other object as ancestor", function() {
        referee.assert.hasPrototype(specializedThing, MyThing.prototype);
    });

    it("should fail with custom message", function() {
        var message = "272bbe5f-e863-490b-9ed0-6af2e95b4b0e";

        assert.throws(
            function() {
                referee.assert.hasPrototype(
                    otherThing,
                    MyThing.prototype,
                    message
                );
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.hasPrototype] " +
                        message +
                        ": Expected {} to have " +
                        myThingString +
                        " on its prototype chain"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.hasPrototype");
                return true;
            }
        );
    });
});

describe("refute.hasPrototype", function() {
    it("should fail with no arguments", function() {
        assert.throws(
            function() {
                referee.refute.hasPrototype();
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.hasPrototype] Expected to receive at least 2 argument(s)"
                );
                assert.equal(error.name, "AssertionError");
                return true;
            }
        );
    });

    it("should fail with only one object", function() {
        assert.throws(
            function() {
                referee.refute.hasPrototype({});
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.hasPrototype] Expected to receive at least 2 argument(s)"
                );
                assert.equal(error.name, "AssertionError");
                return true;
            }
        );
    });

    it("should fail when object inherits from prototype", function() {
        assert.throws(
            function() {
                referee.refute.hasPrototype(myThing, MyThing.prototype);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.hasPrototype] Expected MyThing {} not to have " +
                        myThingString +
                        " on its prototype chain"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.hasPrototype");
                return true;
            }
        );
    });

    it("should fail when object has prototype as ancestor", function() {
        assert.throws(
            function() {
                referee.refute.hasPrototype(
                    specializedThing,
                    MyThing.prototype
                );
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.hasPrototype] Expected MyThing {} not to have " +
                        myThingString +
                        " on its prototype chain"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.hasPrototype");
                return true;
            }
        );
    });

    it("should pass when primitive does not inherit from prototype", function() {
        referee.refute.hasPrototype(3, MyThing);
    });

    it("should pass when object does not inherit", function() {
        referee.refute.hasPrototype(otherThing, MyThing);
    });

    it("should fail with custom message", function() {
        var message = "d4aea902-44f2-4ba1-a33e-503132f82eca";

        assert.throws(
            function() {
                referee.refute.hasPrototype(
                    specializedThing,
                    MyThing.prototype,
                    message
                );
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.hasPrototype] " +
                        message +
                        ": Expected MyThing {} not to have " +
                        myThingString +
                        " on its prototype chain"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.hasPrototype");
                return true;
            }
        );
    });
});
