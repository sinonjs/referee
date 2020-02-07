"use strict";

var testHelper = require("../test-helper");
var captureArgs = require("../test-helper/capture-args");

var obj = { id: 42 };

testHelper.assertionTests("assert", "equals", function(pass, fail, msg, error) {
    var func = function() {};
    var arr = [];
    var date = new Date();
    var sameDate = new Date(date.getTime());
    var anotherDate = new Date(date.getTime() - 10);

    pass("when comparing object to itself", obj, obj);
    pass("when comparing strings", "Hey", "Hey");
    pass("when comparing numbers", 32, 32);
    pass("when comparing booleans", false, false);
    pass("when comparing null", null, null);
    fail("when comparing undefined", undefined, undefined);
    pass("when comparing function to itself", func, func);
    fail(
        "when comparing functions",
        function() {},
        function() {}
    );
    pass("when comparing array to itself", arr, arr);
    pass("when comparing date objects with same date", date, sameDate);
    fail("when comparing date objects with different dates", date, anotherDate);
    fail("when comparing date objects to null", date, null);
    fail("when comparing strings and numbers with coercion", "4", 4);
    fail("when comparing numbers and strings with coercion", 4, "4");
    // eslint-disable-next-line no-new-wrappers
    fail("when comparing number object with coercion", 32, new Number(32));
    // eslint-disable-next-line no-new-wrappers
    fail(
        "when comparing number object reverse with coercion",
        // eslint-disable-next-line no-new-wrappers
        new Number(32),
        32
    );
    fail("when comparing falsy values with coercion", 0, "");
    fail("when comparing falsy values reverse with coercion", "", 0);
    // eslint-disable-next-line no-new-wrappers
    fail("when comparing string boxing with coercion", "4", new String("4"));
    // eslint-disable-next-line no-new-wrappers
    fail(
        "when comparing string boxing reverse with coercion",
        // eslint-disable-next-line no-new-wrappers
        new String("4"),
        "4"
    );
    pass("when comparing NaN to NaN", NaN, NaN);
    fail("when comparing -0 to +0", -0, +0);
    fail(
        "when comparing objects with different own properties",
        { id: 42 },
        { id: 42, di: 24 }
    );
    fail(
        "when comparing objects with different own properties #2",
        { id: undefined },
        { di: 24 }
    );
    fail(
        "when comparing objects with different own properties #3",
        { id: 24 },
        { di: undefined }
    );
    pass("when comparing objects with one property", { id: 42 }, { id: 42 });
    pass(
        "when comparing objects with one object property",
        { obj: { id: 42 } },
        { obj: { id: 42 } }
    );
    fail(
        "when comparing objects with one property with different values",
        { id: 42 },
        { id: 24 }
    );

    var deepObject = {
        id: 42,
        name: "Hey",
        sayIt: function() {
            return this.name;
        },

        child: {
            speaking: function() {}
        }
    };

    pass("when comparing complex objects", deepObject, {
        sayIt: deepObject.sayIt,
        child: { speaking: deepObject.child.speaking },
        id: 42,
        name: "Hey"
    });

    pass(
        "when comparing arrays",
        [1, 2, "Hey there", func, { id: 42, prop: [2, 3] }],
        [1, 2, "Hey there", func, { id: 42, prop: [2, 3] }]
    );

    pass("when comparing regexp literals", /a/, /a/);
    pass(
        "when comparing regexp objects",
        new RegExp("[a-z]+"),
        new RegExp("[a-z]+")
    );

    var re1 = new RegExp("[a-z]+");
    var re2 = new RegExp("[a-z]+");
    re2.id = 42;

    fail("when comparing nested array with shallow array", [["hey"]], ["hey"]);
    fail("when comparing regexp objects with custom properties", re1, re2);
    fail("when comparing different objects", { id: 42 }, {});
    fail("when comparing object to null", {}, null);
    fail("when comparing object to undefined", {}, undefined);
    fail("when comparing object to false", {}, false);
    fail("when comparing false to object", false, {});
    fail("when comparing object to true", {}, true);
    fail("when comparing true to object", true, {});
    fail("when comparing 'empty' object to date", {}, new Date());
    // eslint-disable-next-line no-new-wrappers
    fail("when comparing 'empty' object to string object", {}, new String());
    // eslint-disable-next-line no-new-wrappers
    fail("when comparing 'empty' object to number object", {}, new Number());
    fail("when comparing 'empty' object to empty array", {}, []);

    var arrayLike = { length: 4, "0": 1, "1": 2, "2": {}, "3": [] };

    pass("when comparing empty arguments to empty array", captureArgs(), []);

    fail("when comparing empty array to empty arguments", [], captureArgs());

    pass(
        "when comparing arguments with elements to array with equal elements",
        captureArgs(1, 2, {}, []),
        [1, 2, {}, []]
    );

    pass(
        "when comparing arguments to array like object",
        captureArgs(1, 2, {}, []),
        arrayLike
    );

    msg(
        "fail with understandable message",
        "[assert.equals] {} expected to be equal to 'Hey'",
        {},
        "Hey"
    );

    msg(
        "fail with custom message",
        "[assert.equals] Here: {} expected to be equal to 'Hey'",
        {},
        "Hey",
        "Here:"
    );

    msg(
        "fail for multi-line strings",
        "[assert.equals] 'Yo!\\\\nMultiline' expected to be equal to 'Yo!\\\\nHey'",
        "Yo!\nMultiline",
        "Yo!\nHey"
    );

    msg(
        "fail for multi-line strings with more than one newline",
        "[assert.equals] 'Yo!\\\\nMulti-\\\\nline' expected to be equal to 'Yo!\\\\nHey'",
        "Yo!\nMulti-\nline",
        "Yo!\nHey"
    );

    msg(
        "fail with regular message for one-line strings",
        "[assert.equals] 'Yo' expected to be equal to 'Hey'",
        "Yo",
        "Hey"
    );
    error(
        "when comparing strings",
        {
            code: "ERR_ASSERTION",
            actual: "foo",
            expected: "bar",
            operator: "assert.equals"
        },
        "foo",
        "bar"
    );
    error(
        "when comparing different objects",
        {
            code: "ERR_ASSERTION",
            actual: { id: 42 },
            expected: {},
            operator: "assert.equals"
        },
        { id: 42 },
        {}
    );
});

testHelper.assertionTests("refute", "equals", function(pass, fail, msg, error) {
    fail("when comparing object to itself", obj, obj);
    fail("when comparing strings", "Hey", "Hey");
    fail("when comparing numbers", 32, 32);
    fail("when comparing booleans", false, false);
    fail("when comparing null", null, null);
    fail("when comparing undefined", undefined, undefined);

    var func = function() {};
    var arr = [];
    var date = new Date();
    var sameDate = new Date(date.getTime());
    var anotherDate = new Date(date.getTime() - 10);

    fail("when comparing function to itself", func, func);
    pass(
        "when comparing functions",
        function() {},
        function() {}
    );
    fail("when comparing array to itself", arr, arr);
    fail("when comparing date objects with same date", date, sameDate);
    pass("when comparing date objects with different dates", date, anotherDate);
    pass("when comparing date objects to null", new Date(), null);
    pass("when comparing string with number with coercion", "4", 4);
    pass("when comparing number with string with coercion", 32, "32");
    pass("when comparing with coercion", 0, "");
    pass(
        "when comparing objects with different own properties",
        { id: 42 },
        { id: 42, di: 24 }
    );
    pass(
        "when comparing objects with different own properties #2",
        { id: undefined },
        { di: 24 }
    );
    pass(
        "when comparing objects with different own properties #3",
        { id: 24 },
        { di: undefined }
    );
    fail("when comparing objects with one property", { id: 42 }, { id: 42 });
    fail(
        "when comparing objects with one object property",
        { obj: { id: 42 } },
        { obj: { id: 42 } }
    );
    pass(
        "when comparing objects with one property with different values",
        { id: 42 },
        { id: 24 }
    );
    fail("when comparing NaN to NaN", NaN, NaN);
    pass("when comparing -0 to +0", -0, +0);

    var deepObject = {
        id: 42,
        name: "Hey",
        sayIt: function() {
            return this.name;
        },

        child: {
            speaking: function() {}
        }
    };

    fail("when comparing complex objects", deepObject, {
        sayIt: deepObject.sayIt,
        child: { speaking: deepObject.child.speaking },
        id: 42,
        name: "Hey"
    });

    var arr1 = [1, 2, "Hey there", func, { id: 42, prop: [2, 3] }];
    var arr2 = [1, 2, "Hey there", func, { id: 42, prop: [2, 3] }];

    fail("when comparing arrays", arr1, arr2);
    fail("when comparing regexp literals", /a/, /a/);

    fail(
        "when comparing regexp objects",
        new RegExp("[a-z]+"),
        new RegExp("[a-z]+")
    );

    var re1 = new RegExp("[a-z]+");
    var re2 = new RegExp("[a-z]+");
    re2.id = 42;

    pass("when comparing regexp objects with custom properties", re1, re2);
    pass("when comparing different objects", obj, {});
    pass("when comparing object to null", {}, null);
    pass("when comparing null to object", {}, null);
    fail("when comparing object to undefined", {}, undefined);
    pass("when comparing undefined to object", undefined, {});
    pass("when comparing object to false", {}, false);
    pass("when comparing false to object", false, {});
    pass("when comparing object to true", {}, true);
    pass("when comparing true to object", true, {});
    pass("when comparing 'empty' object to date", {}, new Date());
    // eslint-disable-next-line no-new-wrappers
    pass("when comparing 'empty' object to string object", {}, new String());
    // eslint-disable-next-line no-new-wrappers
    pass("when comparing 'empty' object to number object", {}, new Number());
    pass("when comparing 'empty' object to empty array", {}, []);
    pass("when comparing multi-line strings", "Hey\nHo", "Yo\nNo");

    var arrayLike = { length: 4, "0": 1, "1": 2, "2": {}, "3": [] };

    fail(
        "when comparing arguments with elements to array with equal elements",
        captureArgs(1, 2, {}, []),
        [1, 2, {}, []]
    );

    fail("when comparing empty arguments to empty array", captureArgs(), []);

    pass("when comparing empty array to empty arguments", [], captureArgs());

    fail(
        "when comparing arguments to array like object",
        captureArgs(1, 2, {}, []),
        arrayLike
    );

    msg(
        "fail with understandable message",
        "[refute.equals] {} expected not to be equal to {}",
        {},
        {}
    );

    msg(
        "fail with custom message",
        "[refute.equals] Eh? {} expected not to be equal to {}",
        {},
        {},
        "Eh?"
    );
    error(
        "when comparing strings",
        {
            code: "ERR_ASSERTION",
            operator: "refute.equals"
        },
        "foo",
        "foo"
    );
    error(
        "when comparing multi-line strings",
        {
            code: "ERR_ASSERTION",
            operator: "refute.equals"
        },
        "foo\nbar",
        "foo\nbar"
    );
    error(
        "when comparing different objects",
        {
            code: "ERR_ASSERTION",
            operator: "refute.equals"
        },
        { id: 42 },
        { id: 42 }
    );
});
