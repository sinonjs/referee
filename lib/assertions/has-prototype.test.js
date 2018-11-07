"use strict";

var testHelper = require("../test-helper");

function MyThing() {}
var myThing = new MyThing();
var otherThing = {};
function F() {}
F.prototype = myThing;
var specializedThing = new F();

testHelper.assertionTests("assert", "hasPrototype", function(
    pass,
    fail,
    msg,
    error
) {
    fail(
        "when object does not inherit from prototype",
        otherThing,
        MyThing.prototype
    );
    fail(
        "when primitive does not inherit from prototype",
        3,
        MyThing.prototype
    );
    fail("with only one object", {});
    pass(
        "when object has other object on prototype chain",
        myThing,
        MyThing.prototype
    );
    pass("when not directly inheriting", specializedThing, MyThing.prototype);
    msg(
        "with descriptive message",
        "[assert.hasPrototype] Expected {  } to have [MyThing] {  } on its prototype chain",
        otherThing,
        MyThing.prototype
    );
    msg(
        "with custom message",
        "[assert.hasPrototype] Oh: Expected {  } to have [MyThing] {  } on its prototype chain",
        otherThing,
        MyThing.prototype,
        "Oh"
    );
    msg(
        "fail if not passed arguments",
        "[assert.hasPrototype] Expected to receive at least 2 arguments"
    );
    error(
        "when object does not inherit from prototype",
        {
            code: "ERR_ASSERTION",
            actual: otherThing,
            expected: MyThing.prototype,
            operator: "assert.hasPrototype"
        },
        otherThing,
        MyThing.prototype
    );
});

testHelper.assertionTests("refute", "hasPrototype", function(
    pass,
    fail,
    msg,
    error
) {
    fail("when object inherits from prototype", myThing, MyThing.prototype);
    fail(
        "when not inheriting 'indirectly'",
        specializedThing,
        MyThing.prototype
    );
    fail("with only one object", {});
    pass(
        "when primitive does not inherit from prototype",
        3,
        MyThing.prototype
    );
    pass("when object does not inherit", otherThing, MyThing.prototype);
    msg(
        "with descriptive message",
        "[refute.hasPrototype] Expected [MyThing] {  } not to have [MyThing] {  } on its prototype chain",
        myThing,
        MyThing.prototype
    );
    msg(
        "with descriptive message",
        "[refute.hasPrototype] Oh: Expected [MyThing] {  } not to have [MyThing] {  } on its prototype chain",
        myThing,
        MyThing.prototype,
        "Oh"
    );
    msg(
        "fail if not passed arguments",
        "[refute.hasPrototype] Expected to receive at least 2 arguments"
    );
    error(
        "when object inherits from prototype",
        {
            code: "ERR_ASSERTION",
            operator: "refute.hasPrototype"
        },
        myThing,
        MyThing.prototype
    );
});
