"use strict";

var referee = require("../lib/referee");
var testHelper = require("./test-helper");
var sinon = require("sinon");

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
    pass("when comparing undefined", undefined, undefined);
    pass("when comparing function to itself", func, func);
    fail("when comparing functions", function() {}, function() {});
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

    function gather() {
        return arguments;
    }
    var arrayLike = { length: 4, "0": 1, "1": 2, "2": {}, "3": [] };

    pass(
        "when comparing arguments to array",
        [1, 2, {}, []],
        gather(1, 2, {}, [])
    );
    pass("when comparing array to arguments", gather(), []);

    pass(
        "when comparing arguments to array like object",
        arrayLike,
        gather(1, 2, {}, [])
    );

    msg(
        "fail with understandable message",
        "[assert.equals] {  } expected to be equal to Hey",
        {},
        "Hey"
    );

    msg(
        "fail with custom message",
        "[assert.equals] Here: {  } expected to be equal to Hey",
        {},
        "Hey",
        "Here:"
    );

    msg(
        "fail for multi-line strings",
        "[assert.equals] Yo!\\nMultiline expected to be equal to Yo!\\nHey",
        "Yo!\nMultiline",
        "Yo!\nHey"
    );

    msg(
        "fail for multi-line strings with more than one newline",
        "[assert.equals] Yo!\\nMulti-\\nline expected to be equal to Yo!\\nHey",
        "Yo!\nMulti-\nline",
        "Yo!\nHey"
    );

    msg(
        "fail with regular message for one-line strings",
        "[assert.equals] Yo expected to be equal to Hey",
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
    pass("when comparing functions", function() {}, function() {});
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
    pass("when comparing object to undefined", {}, undefined);
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

    function gather() {
        return arguments;
    }
    var arrayLike = { length: 4, "0": 1, "1": 2, "2": {}, "3": [] };

    fail(
        "when comparing arguments to array",
        [1, 2, {}, []],
        gather(1, 2, {}, [])
    );
    fail("when comparing array to arguments", gather(), []);
    fail(
        "when comparing arguments to array like object",
        arrayLike,
        gather(1, 2, {}, [])
    );

    msg(
        "fail with understandable message",
        "[refute.equals] {  } expected not to be equal to {  }",
        {},
        {}
    );

    msg(
        "fail with custom message",
        "[refute.equals] Eh? {  } expected not to be equal to {  }",
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

testHelper.assertionTests("assert", "greater", function(
    pass,
    fail,
    msg,
    error
) {
    pass("when greater than", 2, 1);
    fail("when equal", 1, 1);
    fail("when less than", 0, 1);
    msg(
        "fail with descriptive message",
        "[assert.greater] Expected 1 to be greater than 2",
        1,
        2
    );
    error(
        "when less than",
        {
            code: "ERR_ASSERTION",
            actual: 0,
            expected: 1,
            operator: "assert.greater"
        },
        0,
        1
    );
});

testHelper.assertionTests("refute", "greater", function(
    pass,
    fail,
    msg,
    error
) {
    fail("when greater than", 2, 1);
    pass("when equal", 1, 1);
    pass("when less than", 0, 1);
    msg(
        "fail with descriptive message",
        "[refute.greater] Expected 2 to be less than or equal to 1",
        2,
        1
    );
    error(
        "when greater than",
        {
            code: "ERR_ASSERTION",
            operator: "refute.greater"
        },
        2,
        1
    );
});

testHelper.assertionTests("assert", "less", function(pass, fail, msg, error) {
    fail("when greater than", 2, 1);
    fail("when equal", 1, 1);
    pass("when less than", 0, 1);
    msg(
        "fail with descriptive message",
        "[assert.less] Expected 2 to be less than 1",
        2,
        1
    );
    error(
        "when greater than",
        {
            code: "ERR_ASSERTION",
            actual: 2,
            expected: 1,
            operator: "assert.less"
        },
        2,
        1
    );
});

testHelper.assertionTests("refute", "less", function(pass, fail, msg, error) {
    pass("when greater than", 2, 1);
    pass("when equal", 1, 1);
    fail("when less than", 0, 1);
    msg(
        "fail with descriptive message",
        "[refute.less] Expected 1 to be greater than or equal to 2",
        1,
        2
    );
    error(
        "when less than",
        {
            code: "ERR_ASSERTION",
            operator: "refute.less"
        },
        0,
        1
    );
});

testHelper.assertionTests("assert", "isString", function(
    pass,
    fail,
    msg,
    error
) {
    pass("for string", "Hey");
    fail("for object", {});
    msg(
        "fail with descriptive message",
        "[assert.isString] Expected {  } (object) to be string",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isString] Snap: Expected {  } (object) to be string",
        {},
        "Snap"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            actual: "object",
            expected: "string",
            operator: "assert.isString"
        },
        {}
    );
});

testHelper.assertionTests("refute", "isString", function(
    pass,
    fail,
    msg,
    error
) {
    fail("for string", "Hey");
    pass("for object", {});
    msg(
        "fail with descriptive message",
        "[refute.isString] Expected Yo not to be string",
        "Yo"
    );
    msg(
        "fail with custom message",
        "[refute.isString] Here goes: Expected Yo not to be string",
        "Yo",
        "Here goes"
    );
    error(
        "for string",
        {
            code: "ERR_ASSERTION",
            operator: "refute.isString"
        },
        "Hey"
    );
});

testHelper.assertionTests("assert", "isObject", function(
    pass,
    fail,
    msg,
    error
) {
    pass("for object", {});
    fail("for function", function() {});
    fail("for null", null);
    msg(
        "fail with descriptive message",
        "[assert.isObject] Hey (string) expected to be object and not null",
        "Hey"
    );
    msg(
        "fail with custom message",
        "[assert.isObject] OH! Hey (string) expected to be object and not null",
        "Hey",
        "OH!"
    );
    error(
        "for function",
        {
            code: "ERR_ASSERTION",
            actual: "function",
            expected: "object",
            operator: "assert.isObject"
        },
        function() {}
    );
});

testHelper.assertionTests("refute", "isObject", function(
    pass,
    fail,
    msg,
    error
) {
    fail("for object", {});
    pass("for function", function() {});
    pass("for null", null);
    msg(
        "fail with descriptive message",
        "[refute.isObject] {  } expected to be null or not an object",
        {}
    );
    msg(
        "fail with custom message",
        "[refute.isObject] Oh no! {  } expected to be null or not an object",
        {},
        "Oh no!"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "refute.isObject"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isFunction", function(
    pass,
    fail,
    msg,
    error
) {
    pass("for function", function() {});
    fail("for object", {});
    msg(
        "fail with descriptive message",
        "[assert.isFunction] Hey (string) expected to be function",
        "Hey"
    );
    msg(
        "fail with custom message",
        "[assert.isFunction] Oh no: Hey (string) expected to be function",
        "Hey",
        "Oh no"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            actual: "object",
            expected: "function",
            operator: "assert.isFunction"
        },
        {}
    );
});

testHelper.assertionTests("refute", "isFunction", function(
    pass,
    fail,
    msg,
    error
) {
    fail("for function", function() {});
    pass("for object", {});
    msg(
        "fail with descriptive message",
        "[refute.isFunction] function () {} expected not to be function",
        function() {}
    );
    msg(
        "fail with custom message",
        "[refute.isFunction] Hmm: function () {} expected not to be function",
        function() {},
        "Hmm"
    );
    error(
        "for function",
        {
            code: "ERR_ASSERTION",
            operator: "refute.isFunction"
        },
        function() {}
    );
});

testHelper.assertionTests("assert", "isBoolean", function(
    pass,
    fail,
    msg,
    error
) {
    pass("for boolean", true);
    fail("for function", function() {});
    fail("for null", null);
    msg(
        "fail with descriptive message",
        "[assert.isBoolean] Expected Hey (string) to be boolean",
        "Hey"
    );
    msg(
        "fail with custom message",
        "[assert.isBoolean] Boolean, plz: Expected Hey (string) to be boolean",
        "Hey",
        "Boolean, plz"
    );
    error(
        "for string",
        {
            code: "ERR_ASSERTION",
            actual: "string",
            expected: "boolean",
            operator: "assert.isBoolean"
        },
        "Hey"
    );
});

testHelper.assertionTests("refute", "isBoolean", function(
    pass,
    fail,
    msg,
    error
) {
    fail("for boolean", true);
    pass("for function", function() {});
    pass("for null", null);
    msg(
        "fail with descriptive message",
        "[refute.isBoolean] Expected true not to be boolean",
        true
    );
    msg(
        "fail with custom message",
        "[refute.isBoolean] Here: Expected true not to be boolean",
        true,
        "Here"
    );
    error(
        "for boolean",
        {
            code: "ERR_ASSERTION",
            operator: "refute.isBoolean"
        },
        false
    );
});

testHelper.assertionTests("assert", "isNumber", function(
    pass,
    fail,
    msg,
    error
) {
    pass("for number", 32);
    fail("for NaN (sic)", NaN);
    fail("for function", function() {});
    fail("for null", null);
    msg(
        "fail with descriptive message",
        "[assert.isNumber] Expected Hey (string) to be a non-NaN number",
        "Hey"
    );
    msg(
        "fail with custom message",
        "[assert.isNumber] Check it: Expected Hey (string) to be a non-NaN number",
        "Hey",
        "Check it"
    );
    error(
        "for string",
        {
            code: "ERR_ASSERTION",
            actual: "string",
            expected: "number",
            operator: "assert.isNumber"
        },
        "Hey"
    );
});

testHelper.assertionTests("refute", "isNumber", function(
    pass,
    fail,
    msg,
    error
) {
    fail("for number", 32);
    pass("for NaN (sic)", NaN);
    pass("for function", function() {});
    pass("for null", null);
    msg(
        "fail with descriptive message",
        "[refute.isNumber] Ho ho! Expected 42 to be NaN or a non-number value",
        42,
        "Ho ho!"
    );
    error(
        "for number",
        {
            code: "ERR_ASSERTION",
            operator: "refute.isNumber"
        },
        42
    );
});

testHelper.assertionTests("assert", "isNaN", function(pass, fail, msg, error) {
    pass("for NaN", NaN);
    fail("for number", 32);
    fail("for function", function() {});
    fail("for object", {});
    fail("for null", null);
    msg(
        "fail with descriptive message",
        "[assert.isNaN] Expected 32 to be NaN",
        32
    );
    msg(
        "fail with custom message",
        "[assert.isNaN] No! Expected 32 to be NaN",
        32,
        "No!"
    );
    error(
        "for number",
        {
            code: "ERR_ASSERTION",
            actual: 42,
            expected: "NaN",
            operator: "assert.isNaN"
        },
        42
    );
});

testHelper.assertionTests("refute", "isNaN", function(pass, fail, msg, error) {
    fail("for NaN", NaN);
    pass("for number", 32);
    pass("for function", function() {});
    pass("for object", {});
    pass("for null", null);
    msg(
        "fail with descriptive message",
        "[refute.isNaN] Expected not to be NaN",
        NaN
    );
    msg(
        "fail with custom message",
        "[refute.isNaN] Hey: Expected not to be NaN",
        NaN,
        "Hey"
    );
    error(
        "for NaN",
        {
            code: "ERR_ASSERTION",
            operator: "refute.isNaN"
        },
        NaN
    );
});

testHelper.assertionTests("assert", "isArray", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    var arrayLike = {
        length: 4,
        "0": "One",
        "1": "Two",
        "2": "Three",
        "3": "Four",
        splice: function() {}
    };

    pass("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    fail("for array like", arrayLike);
    msg(
        "fail with descriptive message",
        "[assert.isArray] Expected {  } to be array",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isArray] Nope: Expected {  } to be array",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isArray"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isArrayBuffer", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    pass("for ArrayBuffer", new global.ArrayBuffer(8));
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isArrayBuffer] Expected {  } to be an ArrayBuffer",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isArrayBuffer] Nope: Expected {  } to be an ArrayBuffer",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isArrayBuffer"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isDataView", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    var ab = new global.ArrayBuffer(8);
    var dv = new global.DataView(ab);

    pass("for DataView", dv);
    fail("for ArrayBuffer", ab);
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isDataView] Expected {  } to be a DataView",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isDataView] Nope: Expected {  } to be a DataView",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isDataView"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isDate", function(pass, fail, msg, error) {
    function captureArgs() {
        return arguments;
    }

    pass("for Date", new Date());
    fail("for RegExp", new RegExp("[a-z]"));
    fail("for string", "123");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isDate] Expected {  } to be a Date",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isDate] Nope: Expected {  } to be a Date",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isDate"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isError", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    pass("for Error", new Error("error"));
    pass("for EvalError", new EvalError("eval error"));
    pass("for RangeError", new RangeError("range error"));
    pass("for ReferenceError", new ReferenceError("reference error"));
    pass("for SyntaxError", new SyntaxError("syntax error"));
    pass("for TypeError", new TypeError("type error"));
    pass("for URIError", new URIError("uri error"));
    fail("for string", "not an error");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isError] Expected {  } to be an Error",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isError] Nope: Expected {  } to be an Error",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isError"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isEvalError", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    fail("for Error", new Error("error"));
    pass("for EvalError", new EvalError("eval error"));
    fail("for RangeError", new RangeError("range error"));
    fail("for ReferenceError", new ReferenceError("reference error"));
    fail("for SyntaxError", new SyntaxError("syntax error"));
    fail("for TypeError", new TypeError("type error"));
    fail("for URIError", new URIError("uri error"));
    fail("for string", "not an error");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isEvalError] Expected {  } to be an EvalError",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isEvalError] Nope: Expected {  } to be an EvalError",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isEvalError"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isFloat32Array", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    pass("for Float32Array", new Float32Array(2));
    fail("for Float64Array", new Float64Array(2));
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isFloat32Array] Expected {  } to be a Float32Array",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isFloat32Array] Nope: Expected {  } to be a Float32Array",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isFloat32Array"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isFloat64Array", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    fail("for Float32Array", new Float32Array(2));
    pass("for Float64Array", new Float64Array(2));
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isFloat64Array] Expected {  } to be a Float64Array",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isFloat64Array] Nope: Expected {  } to be a Float64Array",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isFloat64Array"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isInfinity", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    pass("for Infinity", Infinity);
    fail("for NaN", NaN);
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isInfinity] Expected {  } to be Infinity",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isInfinity] Nope: Expected {  } to be Infinity",
        {},
        "Nope"
    );
    error(
        "for number",
        {
            code: "ERR_ASSERTION",
            actual: 42,
            expected: Infinity,
            operator: "assert.isInfinity"
        },
        42
    );
});

testHelper.assertionTests("assert", "isInt8Array", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    pass("for Int8Array", new Int8Array(2));
    fail("for Int16Array", new Int16Array(2));
    fail("for Int32Array", new Int32Array(2));
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isInt8Array] Expected {  } to be an Int8Array",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isInt8Array] Nope: Expected {  } to be an Int8Array",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isInt8Array"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isInt16Array", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    fail("for Int8Array", new Int8Array(2));
    pass("for Int16Array", new Int16Array(2));
    fail("for Int32Array", new Int32Array(2));
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isInt16Array] Expected {  } to be an Int16Array",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isInt16Array] Nope: Expected {  } to be an Int16Array",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isInt16Array"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isInt32Array", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    fail("for Int8Array", new Int8Array(2));
    fail("for Int16Array", new Int16Array(2));
    pass("for Int32Array", new Int32Array(2));
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isInt32Array] Expected {  } to be an Int32Array",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isInt32Array] Nope: Expected {  } to be an Int32Array",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isInt32Array"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isIntlCollator", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    pass("for Intl.Collator", new Intl.Collator());
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isIntlCollator] Expected {  } to be an Intl.Collator",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isIntlCollator] Nope: Expected {  } to be an Intl.Collator",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isIntlCollator"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isIntlDateTimeFormat", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    pass("for Intl.DateTimeFormat", new Intl.DateTimeFormat());
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isIntlDateTimeFormat] Expected {  } to be an Intl.DateTimeFormat",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isIntlDateTimeFormat] Nope: Expected {  } to be an Intl.DateTimeFormat",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isIntlDateTimeFormat"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isIntlNumberFormat", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    pass("for Intl.NumberFormat", new Intl.NumberFormat());
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isIntlNumberFormat] Expected {  } to be an Intl.NumberFormat",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isIntlNumberFormat] Nope: Expected {  } to be an Intl.NumberFormat",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isIntlNumberFormat"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isMap", function(pass, fail, msg, error) {
    function captureArgs() {
        return arguments;
    }

    pass("for Map", new Map());
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isMap] Expected {  } to be a Map",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isMap] Nope: Expected {  } to be a Map",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isMap"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isPromise", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    pass("for Promise", Promise.resolve("apple pie"));
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isPromise] Expected {  } to be a Promise",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isPromise] Nope: Expected {  } to be a Promise",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isPromise"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isRangeError", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    fail("for Error", new Error("not pie"));
    pass("for RangeError", new RangeError("apple pie"));
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isRangeError] Expected {  } to be a RangeError",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isRangeError] Nope: Expected {  } to be a RangeError",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isRangeError"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isReferenceError", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    fail("for Error", new Error("not pie"));
    pass("for ReferenceError", new ReferenceError("apple pie"));
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isReferenceError] Expected {  } to be a ReferenceError",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isReferenceError] Nope: Expected {  } to be a ReferenceError",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isReferenceError"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isRegExp", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    pass("for RegExp", new RegExp("apple pie"));
    pass("for RegExp literal", /apple pie/);
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isRegExp] Expected {  } to be a RegExp",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isRegExp] Nope: Expected {  } to be a RegExp",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isRegExp"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isSet", function(pass, fail, msg, error) {
    function captureArgs() {
        return arguments;
    }

    pass("for Set", new Set());
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isSet] Expected {  } to be a Set",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isSet] Nope: Expected {  } to be a Set",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isSet"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isSymbol", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    pass("for Symbol", Symbol("apple pie"));
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isSymbol] Expected {  } to be a Symbol",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isSymbol] Nope: Expected {  } to be a Symbol",
        {},
        "Nope"
    );
    error(
        "for string",
        {
            code: "ERR_ASSERTION",
            actual: "apple pie",
            expected: "symbol",
            operator: "assert.isSymbol"
        },
        "apple pie"
    );
});

testHelper.assertionTests("assert", "isSyntaxError", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    fail("for Error", new Error("not pie"));
    pass("for SyntaxError", new SyntaxError("apple pie"));
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isSyntaxError] Expected {  } to be a SyntaxError",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isSyntaxError] Nope: Expected {  } to be a SyntaxError",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isSyntaxError"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isTypeError", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    fail("for Error", new Error("not pie"));
    pass("for TypeError", new TypeError("apple pie"));
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isTypeError] Expected {  } to be a TypeError",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isTypeError] Nope: Expected {  } to be a TypeError",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isTypeError"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isURIError", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    fail("for Error", new Error("not pie"));
    pass("for URIError", new URIError("apple pie"));
    fail("for string", "apple pie");
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isURIError] Expected {  } to be a URIError",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isURIError] Nope: Expected {  } to be a URIError",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isURIError"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isUint16Array", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    pass("for Uint16Array", new Uint16Array());
    fail("for Uint32Array", new Uint32Array());
    fail("for Uint8Array", new Uint8Array());
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isUint16Array] Expected {  } to be a Uint16Array",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isUint16Array] Nope: Expected {  } to be a Uint16Array",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isUint16Array"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isUint32Array", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    fail("for Uint16Array", new Uint16Array());
    pass("for Uint32Array", new Uint32Array());
    fail("for Uint8Array", new Uint8Array());
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isUint32Array] Expected {  } to be a Uint32Array",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isUint32Array] Nope: Expected {  } to be a Uint32Array",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isUint32Array"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isUint8Array", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    fail("for Uint16Array", new Uint16Array());
    fail("for Uint32Array", new Uint32Array());
    pass("for Uint8Array", new Uint8Array());
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isUint8Array] Expected {  } to be a Uint8Array",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isUint8Array] Nope: Expected {  } to be a Uint8Array",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isUint8Array"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isUint8ClampedArray", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    fail("for Uint8Array", new Uint8Array());
    pass("for Uint8ClampedArray", new Uint8ClampedArray());
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isUint8ClampedArray] Expected {  } to be a Uint8ClampedArray",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isUint8ClampedArray] Nope: Expected {  } to be a Uint8ClampedArray",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isUint8ClampedArray"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isWeakMap", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    // eslint-disable-next-line ie11/no-weak-collections
    pass("for WeakMap", new WeakMap());
    fail("for Map", new Map());
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isWeakMap] Expected {  } to be a WeakMap",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isWeakMap] Nope: Expected {  } to be a WeakMap",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isWeakMap"
        },
        {}
    );
});

testHelper.assertionTests("assert", "isWeakSet", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    // eslint-disable-next-line ie11/no-weak-collections
    pass("for WeakSet", new WeakSet());
    fail("for Set", new Set());
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isWeakSet] Expected {  } to be a WeakSet",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isWeakSet] Nope: Expected {  } to be a WeakSet",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isWeakSet"
        },
        {}
    );
});

testHelper.assertionTests("refute", "isArray", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    var arrayLike = {
        length: 4,
        "0": "One",
        "1": "Two",
        "2": "Three",
        "3": "Four",
        splice: function() {}
    };

    fail("for array", []);
    pass("for object", {});
    pass("for arguments", captureArgs());
    pass("for array like", arrayLike);
    msg(
        "fail with descriptive message",
        "[refute.isArray] Expected [1, 2] not to be array",
        [1, 2]
    );
    msg(
        "fail with custom message",
        "[refute.isArray] Hmm: Expected [1, 2] not to be array",
        [1, 2],
        "Hmm"
    );
    error(
        "for array",
        {
            code: "ERR_ASSERTION",
            operator: "refute.isArray"
        },
        []
    );
});

testHelper.assertionTests("assert", "isArrayLike", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    var arrayLike = {
        length: 4,
        "0": "One",
        "1": "Two",
        "2": "Three",
        "3": "Four",
        splice: function() {}
    };

    pass("for array", []);
    fail("for object", {});
    pass("for arguments", captureArgs());
    pass("for array like", arrayLike);
    msg(
        "fail with descriptive message",
        "[assert.isArrayLike] Expected {  } to be array like",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isArrayLike] Here! Expected {  } to be array like",
        {},
        "Here!"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isArrayLike"
        },
        {}
    );
});

testHelper.assertionTests("refute", "isArrayLike", function(
    pass,
    fail,
    msg,
    error
) {
    function captureArgs() {
        return arguments;
    }

    var arrayLike = {
        length: 4,
        "0": "One",
        "1": "Two",
        "2": "Three",
        "3": "Four",
        splice: function() {}
    };

    fail("for array", []);
    pass("for object", {});
    fail("for arguments", captureArgs());
    fail("for array like", arrayLike);
    msg(
        "fail with descriptive message",
        "[refute.isArrayLike] Expected [1, 2] not to be array like",
        [1, 2]
    );
    msg(
        "fail with custom message",
        "[refute.isArrayLike] Hey: Expected [1, 2] not to be array like",
        [1, 2],
        "Hey"
    );
    error(
        "for array like",
        {
            code: "ERR_ASSERTION",
            operator: "refute.isArrayLike"
        },
        arrayLike
    );
});

testHelper.assertionTests("assert", "defined", function(
    pass,
    fail,
    msg,
    error
) {
    fail("for undefined", undefined);
    pass("for function", function() {});
    pass("for null", null);
    msg(
        "fail with descriptive message",
        "[assert.defined] Expected to be defined",
        undefined
    );
    msg(
        "fail with custom message",
        "[assert.defined] Huh? Expected to be defined",
        undefined,
        "Huh?"
    );
    error(
        "for undefined",
        {
            code: "ERR_ASSERTION",
            operator: "assert.defined"
        },
        undefined
    );
});

testHelper.assertionTests("refute", "defined", function(
    pass,
    fail,
    msg,
    error
) {
    pass("for undefined", undefined);
    fail("for function", function() {});
    fail("for null", null);
    msg(
        "fail with descriptive message",
        "[refute.defined] Expected Hey (string) not to be defined",
        "Hey"
    );
    msg(
        "fail with custom message",
        "[refute.defined] Yawn... Expected Hey (string) not to be defined",
        "Hey",
        "Yawn..."
    );
    error(
        "for null",
        {
            code: "ERR_ASSERTION",
            operator: "refute.defined"
        },
        null
    );
});

testHelper.assertionTests("assert", "isNull", function(pass, fail, msg, error) {
    pass("for null", null);
    fail("for function", function() {});
    fail("for undefined", undefined);
    msg(
        "fail with descriptive message",
        "[assert.isNull] Expected Hey to be null",
        "Hey"
    );
    msg(
        "fail with custom message",
        "[assert.isNull] Hmm: Expected Hey to be null",
        "Hey",
        "Hmm"
    );
    error(
        "for undefined",
        {
            code: "ERR_ASSERTION",
            actual: undefined,
            expected: null,
            operator: "assert.isNull"
        },
        undefined
    );
});

testHelper.assertionTests("refute", "isNull", function(pass, fail, msg, error) {
    fail("for null", null);
    pass("for function", function() {});
    pass("for undefined", undefined);
    msg(
        "fail with descriptive message",
        "[refute.isNull] Expected not to be null",
        null
    );
    msg(
        "fail with custom message",
        "[refute.isNull] Here: Expected not to be null",
        null,
        "Here"
    );
    error(
        "for null",
        {
            code: "ERR_ASSERTION",
            operator: "refute.isNull"
        },
        null
    );
});

testHelper.assertionTests("assert", "match", function(pass, fail, msg, error) {
    pass("matching regexp", "Assertions", /[a-z]/);
    pass("for generic object with test method returning true", "Assertions", {
        test: function() {
            return true;
        }
    });

    fail("for non-matching regexp", "Assertions 123", /^[a-z]$/);
    pass("matching boolean", true, true);
    fail("mis-matching boolean", true, false);

    fail(
        "for generic object with test method returning false",
        {
            test: function() {
                return false;
            }
        },
        "Assertions"
    );

    msg(
        "fail with understandable message",
        "[assert.match] Assertions 123 expected to match /^[a-z]+$/",
        "Assertions 123",
        /^[a-z]+$/
    );

    msg(
        "fail with custom message",
        "[assert.match] Yeah! Assertions 123 expected to match /^[a-z]+$/",
        "Assertions 123",
        /^[a-z]+$/,
        "Yeah!"
    );

    fail("if match object is null", "Assertions 123", null);

    fail("if match object is undefined", "Assertions 123", undefined);

    fail(
        "with custom message if match object is undefined",
        "Assertions 123",
        undefined,
        "No"
    );

    fail("if match object is false", "Assertions 123", false);
    fail("if matching a number against a string", "Assertions 123", 23);
    fail("if matching a number against a similar string", "23", 23);
    pass("if matching a number against itself", 23, 23);

    pass(
        "if matcher is a function that returns true",
        "Assertions 123",
        function() {
            return true;
        }
    );

    fail(
        "if matcher is a function that returns false",
        "Assertions 123",
        function() {
            return false;
        }
    );

    fail(
        "if matcher is a function that returns falsy",
        "Assertions 123",
        function() {}
    );

    fail(
        "if matcher does not return explicit true",
        "Assertions 123",
        function() {
            return "Hey";
        }
    );

    this["should call matcher with assertion argument"] = function() {
        var listener = this.stub().returns(true);

        referee.assert.match("Assertions 123", listener);

        sinon.assert.calledWith(listener, "Assertions 123");
    };

    pass("if matcher is substring of matchee", "Diskord", "or");
    pass("if matcher is string equal to matchee", "Diskord", "Diskord");
    pass(
        "for strings ignoring case",
        "Look ma, case-insensitive",
        "LoOk Ma, CaSe-InSenSiTiVe"
    );

    fail("if match string is not substring of matchee", "Vim", "Emacs");
    fail("if match string is not substring of object", {}, "Emacs");

    fail("if matcher is substring of object.toString", "Emacs", {
        toString: function() {
            return "Emacs";
        }
    });

    fail("for null and empty string", null, "");
    fail("for undefined and empty string", undefined, "");
    fail("for false and empty string", false, "");
    fail("for 0 and empty string", 0, "");
    fail("for NaN and empty string", NaN, "");

    var object = {
        id: 42,
        name: "Christian",
        doIt: "yes",

        speak: function() {
            return this.name;
        }
    };

    pass("if object contains all properties in matcher", object, {
        id: 42,
        doIt: "yes"
    });

    var object2 = {
        id: 42,
        name: "Christian",
        doIt: "yes",
        owner: {
            someDude: "Yes",
            hello: "ok"
        },

        speak: function() {
            return this.name;
        }
    };

    pass("for nested matcher", object2, {
        owner: {
            someDude: "Yes",
            hello: function(value) {
                return value === "ok";
            }
        }
    });

    pass("for empty strings", "", "");
    pass("for empty strings as object properties", { foo: "" }, { foo: "" });
    pass("for similar arrays", [1, 2, 3], [1, 2, 3]);
    pass("for array subset", [1, 2, 3], [2, 3]);
    pass("for single-element array subset", [1, 2, 3], [1]);
    pass("for matching array subset", [1, 2, 3, { id: 42 }], [{ id: 42 }]);
    fail("for mis-matching array 'subset'", [1, 2, 3], [2, 3, 4]);
    fail("for mis-ordered array 'subset'", [1, 2, 3], [1, 3]);

    error(
        "if match string is not substring of matchee",
        {
            code: "ERR_ASSERTION",
            actual: "Vim",
            expected: "Emacs",
            operator: "assert.match"
        },
        "Vim",
        "Emacs"
    );
    error(
        "if object does not contain all properties in matcher",
        {
            code: "ERR_ASSERTION",
            actual: { id: 42, doIt: "yes" },
            expected: { id: 42, doIt: "no" },
            operator: "assert.match"
        },
        object,
        {
            id: 42,
            doIt: "no"
        }
    );
});

testHelper.assertionTests("refute", "match", function(pass, fail, msg, error) {
    fail("matching regexp", "Assertions", /[a-z]/);
    fail("generic object with test method returning true", "Assertions", {
        test: function() {
            return true;
        }
    });

    pass("for non-matching regexp", "Assertions 123", /^[a-z]$/);

    pass("for generic object with test method returning false", "Assertions", {
        test: function() {
            return false;
        }
    });

    msg(
        "fail with understandable message",
        "[refute.match] Assertions 123 expected not to match /^.+$/",
        "Assertions 123",
        /^.+$/
    );
    msg(
        "fail with custom message",
        "[refute.match] NO! Assertions 123 expected not to match /^.+$/",
        "Assertions 123",
        /^.+$/,
        "NO!"
    );

    pass("if match object is null", "Assertions 123", null);
    pass("if match object is undefined", "Assertions 123", undefined);
    pass("if match object is false", "Assertions 123", false);
    pass("if matching a number against a string", "Assertions 123", 23);
    fail("if matching a number against a similar string", 23, "23");
    fail("if matching a number against itself", 23, 23);
    fail(
        "if matcher is a function that returns true",
        "Assertions 123",
        function() {
            return true;
        }
    );

    pass(
        "if matcher is a function that returns false",
        "Assertions 123",
        function() {
            return false;
        }
    );

    pass(
        "if matcher is a function that returns falsy",
        "Assertions 123",
        function() {}
    );

    pass(
        "if matcher does not return explicit true",
        "Assertions 123",
        function() {
            return "Hey";
        }
    );

    this["should call matcher with assertion argument"] = function() {
        var listener = this.stub().returns(false);

        referee.refute.match("Assertions 123", listener);

        sinon.assert.calledWith(listener, "Assertions 123");
    };

    fail("if matcher is substring of matchee", "Diskord", "or");
    fail("if matcher is string equal to matchee", "Diskord", "Diskord");
    pass("if match string is not substring of matchee", "Vim", "Emacs");
    pass("if match string is not substring of object", {}, "Emacs");

    pass("if matcher is substring of object.toString", "Emacs", {
        toString: function() {
            return "Emacs";
        }
    });

    pass("if matching an empty string with null", null, "");
    pass("if matching an empty string with undefined", undefined, "");
    pass("if matching an empty string with false", false, "");
    pass("if matching an empty string with 0", 0, "");
    pass("if matching an empty string with NaN", NaN, "");

    var object = {
        id: 42,
        name: "Christian",
        doIt: "yes",

        speak: function() {
            return this.name;
        }
    };

    fail("if object contains all properties in matcher", object, {
        id: 42,
        doIt: "yes"
    });

    var object2 = {
        id: 42,
        name: "Christian",
        doIt: "yes",
        owner: {
            someDude: "Yes",
            hello: "ok"
        },

        speak: function() {
            return this.name;
        }
    };

    fail("for nested matcher", object2, {
        owner: {
            someDude: "Yes",
            hello: function(value) {
                return value === "ok";
            }
        }
    });

    var object3 = {
        id: 42,
        name: "Christian",
        doIt: "yes",
        owner: {
            someDude: "Yes",
            hello: "ok"
        },

        speak: function() {
            return this.name;
        }
    };

    pass("for nested matcher with mismatching properties", object3, {
        owner: {
            someDude: "No",
            hello: function(value) {
                return value === "ok";
            }
        }
    });

    fail("for similar arrays", [1, 2, 3], [1, 2, 3]);
    fail("for array subset", [1, 2, 3], [2, 3]);
    fail("for single-element array subset", [1, 2, 3], [1]);
    fail("for matching array subset", [1, 2, 3, { id: 42 }], [{ id: 42 }]);
    pass("for mis-matching array 'subset'", [1, 2, 3], [2, 3, 4]);
    pass("for mis-ordered array 'subset'", [1, 2, 3], [1, 3]);

    error(
        "if match string is substring of matchee",
        {
            code: "ERR_ASSERTION",
            operator: "refute.match"
        },
        "Emacs",
        "mac"
    );
});

testHelper.assertionTests("assert", "keys", function(pass, fail, msg, error) {
    function Class(o) {
        for (var key in o) {
            if (o.hasOwnProperty(key)) {
                this[key] = o[key];
            }
        }
    }
    Class.prototype.methodA = function() {};
    Class.prototype.methodB = function() {};

    pass("when keys are exact", { a: 1, b: 2, c: 3 }, ["a", "b", "c"]);
    fail("when keys are missing", { a: 1, b: 2, c: 3 }, ["a", "b"]);
    fail("when keys are excess", { a: 1, b: 2, c: 3 }, ["a", "b", "c", "d"]);
    fail("when keys are not exact", { a: 1, b: 2, c: 3 }, ["a", "b", "d"]);
    pass("when there are no keys", {}, []);
    pass("when values are special", { a: -1, b: null, c: undefined }, [
        "a",
        "b",
        "c"
    ]);
    pass("and ignore object methods", new Class({ a: 1, b: 2, c: 3 }), [
        "a",
        "b",
        "c"
    ]);
    pass(
        "and allow overwriting object methods",
        new Class({ a: 1, methodA: 2 }),
        ["a", "methodA"]
    );

    msg(
        "fail with message",
        '[assert.keys] Expected { a: 1, b: 2, c: 3 } to have exact keys ["a", "b"]',
        { a: 1, b: 2, c: 3 },
        ["a", "b"]
    );

    msg(
        "fail with custom message",
        '[assert.keys] Too bad: Expected { a: 1, b: 2, c: 3 } to have exact keys ["a", "b"]',
        { a: 1, b: 2, c: 3 },
        ["a", "b"],
        "Too bad"
    );

    error(
        "when keys are missing",
        {
            code: "ERR_ASSERTION",
            actual: ["a", "b", "c"],
            expected: ["a", "b"],
            operator: "assert.keys"
        },
        { a: 1, b: 2, c: 3 },
        ["a", "b"]
    );
});

testHelper.assertionTests("refute", "keys", function(pass, fail, msg, error) {
    function Class(o) {
        for (var key in o) {
            if (o.hasOwnProperty(key)) {
                this[key] = o[key];
            }
        }
    }
    Class.prototype.methodA = function() {};
    Class.prototype.methodB = function() {};

    fail("when keys are exact", { a: 1, b: 2, c: 3 }, ["a", "b", "c"]);
    pass("when keys are missing", { a: 1, b: 2, c: 3 }, ["a", "b"]);
    pass("when keys are excess", { a: 1, b: 2, c: 3 }, ["a", "b", "c", "d"]);
    pass("when keys are not exact", { a: 1, b: 2, c: 3 }, ["a", "b", "d"]);
    fail("when there are no keys", {}, []);
    fail("when values are special", { a: -1, b: null, c: undefined }, [
        "a",
        "b",
        "c"
    ]);
    fail("and ignore object methods", new Class({ a: 1, b: 2, c: 3 }), [
        "a",
        "b",
        "c"
    ]);
    fail(
        "and allow overwriting object methods",
        new Class({ a: 1, methodA: 2 }),
        ["a", "methodA"]
    );

    msg(
        "fail with message",
        '[refute.keys] Expected not to have exact keys ["a", "b", "c"]',
        { a: 1, b: 2, c: 3 },
        ["a", "b", "c"]
    );

    msg(
        "fail with custom message",
        '[refute.keys] Too bad: Expected not to have exact keys ["a", "b", "c"]',
        { a: 1, b: 2, c: 3 },
        ["a", "b", "c"],
        "Too bad"
    );
    error(
        "when keys are exact",
        {
            code: "ERR_ASSERTION",
            operator: "refute.keys"
        },
        { a: 1, b: 2, c: 3 },
        ["a", "b", "c"]
    );
});

testHelper.assertionTests("assert", "exception", function(pass, fail, msg) {
    pass("when callback throws", function() {
        throw new Error();
    });
    fail("when callback does not throw", function() {});

    msg(
        "fail with message",
        "[assert.exception] Expected exception",
        function() {}
    );

    pass(
        "when callback throws expected name",
        function() {
            throw new TypeError("Oh hmm");
        },
        { name: "TypeError" }
    );

    fail(
        "when callback does not throw expected name",
        function() {
            throw new Error();
        },
        { name: "TypeError" }
    );

    fail(
        "when thrown message does not match",
        function() {
            throw new Error("Aright");
        },
        { message: "Aww" }
    );

    pass(
        "when message and type matches",
        function() {
            throw new TypeError("Aright");
        },
        { name: "Type", message: "Ar" }
    );

    fail(
        "when callback does not throw and specific type is expected",
        function() {},
        { name: "TypeError" }
    );

    msg(
        "fail with message when not throwing",
        '[assert.exception] Expected { name: "TypeError" } but no exception was thrown',
        function() {},
        { name: "TypeError" }
    );

    msg(
        "fail with custom message",
        "[assert.exception] Hmm: Expected exception",
        function() {},
        "Hmm"
    );

    msg(
        "fail with matcher and custom message",
        '[assert.exception] Hmm: Expected { name: "TypeError" } but no exception was thrown',
        function() {},
        { name: "TypeError" },
        "Hmm"
    );

    pass(
        "when matcher function returns true",
        function() {
            throw new TypeError("Aright");
        },
        function(err) {
            return err.name === "TypeError";
        }
    );

    fail(
        "when matcher function returns truthy",
        function() {
            throw new TypeError("Aright");
        },
        function(err) {
            return err.name;
        }
    );

    fail(
        "when matcher function returns false",
        function() {
            throw new TypeError("Aright");
        },
        function(err) {
            return err.name === "Error";
        }
    );

    msg(
        "when matcher function fails",
        "[assert.exception] Expected thrown TypeError (Aright) to pass matcher function",
        function() {
            throw new TypeError("Aright");
        },
        function(err) {
            return err.name === "Error";
        }
    );

    msg(
        "if not passed arguments",
        "[assert.exception] Expected to receive at least 1 argument"
    );
});

testHelper.assertionTests("refute", "exception", function(pass, fail, msg) {
    fail("when callback throws", function() {
        throw new Error("Yo, Malcolm");
    });

    pass("when callback does not throw", function() {});
    pass("with message when callback does not throw", function() {}, "Oh noes");

    msg(
        "fail with message",
        "[refute.exception] Expected not to throw but threw Error (:()",
        function() {
            throw new Error(":(");
        }
    );

    msg(
        "fail with custom message",
        "[refute.exception] Jeez: Expected not to throw but threw Error (:()",
        function() {
            throw new Error(":(");
        },
        "Jeez"
    );

    msg(
        "fail if not passed arguments",
        "[refute.exception] Expected to receive at least 1 argument"
    );
});

testHelper.assertionTests("assert", "tagName", function(
    pass,
    fail,
    msg,
    error
) {
    pass("for matching tag names", { tagName: "li" }, "li");
    pass("for case-insensitive matching tag names", { tagName: "LI" }, "li");
    pass("for case-insensitive matching tag names #2", { tagName: "li" }, "LI");
    pass("for uppercase matching tag names", { tagName: "LI" }, "LI");
    fail("for non-matching tag names", { tagName: "li" }, "p");
    fail("for substring matches in tag names", { tagName: "li" }, "i");

    msg(
        "fail with message",
        "[assert.tagName] Expected tagName to be p but was li",
        { tagName: "li" },
        "p"
    );

    msg(
        "fail with custom message",
        "[assert.tagName] Here: Expected tagName to be p but was li",
        { tagName: "li" },
        "p",
        "Here"
    );

    msg(
        "fail if not passed arguments",
        "[assert.tagName] Expected to receive at least 2 arguments"
    );

    msg(
        "fail if not passed tag name",
        "[assert.tagName] Expected to receive at least 2 arguments",
        { tagName: "" }
    );

    msg(
        "fail if object does not have tagName property",
        "[assert.tagName] Expected {  } to have tagName property",
        {},
        "li"
    );

    msg(
        "fail with custom message if object does not have tagName property",
        "[assert.tagName] Yikes! Expected {  } to have tagName property",
        {},
        "li",
        "Yikes!"
    );

    if (typeof document !== "undefined") {
        pass("for DOM elements", document.createElement("li"), "li");
    }

    error(
        "for non-matching tag names",
        {
            code: "ERR_ASSERTION",
            actual: "li",
            expected: "p",
            operator: "assert.tagName"
        },
        { tagName: "li" },
        "p"
    );
});

testHelper.assertionTests("refute", "tagName", function(
    pass,
    fail,
    msg,
    error
) {
    fail("for matching tag names", { tagName: "li" }, "li");
    fail("for case-insensitive matching tag names", { tagName: "LI" }, "li");
    fail("for case-insensitive matching tag names #2", { tagName: "LI" }, "li");
    fail("for same casing matching tag names", { tagName: "li" }, "li");
    pass("for non-matching tag names", { tagName: "li" }, "p");
    pass("for substring matching tag names", { tagName: "li" }, "i");
    pass("for case-insensitive non-matching tag names", { tagName: "li" }, "P");
    pass(
        "for case-insensitive substring mathcing tag names",
        { tagName: "li" },
        "i"
    );

    msg(
        "fail with message",
        "[refute.tagName] Expected tagName not to be li",
        { tagName: "li" },
        "li"
    );

    msg(
        "fail with custom message",
        "[refute.tagName] Oh well: Expected tagName not to be li",
        { tagName: "li" },
        "li",
        "Oh well"
    );

    msg(
        "fail if not passed arguments",
        "[refute.tagName] Expected to receive at least 2 arguments"
    );

    msg(
        "fail if not passed tag name",
        "[refute.tagName] Expected to receive at least 2 arguments",
        { tagName: "p" }
    );

    msg(
        "fail if object does not have tagName property",
        "[refute.tagName] Expected {  } to have tagName property",
        {},
        "li"
    );

    msg(
        "fail with custom message if object does not have tagName property",
        "[refute.tagName] Yes: Expected {  } to have tagName property",
        {},
        "li",
        "Yes"
    );

    if (typeof document !== "undefined") {
        pass("for DOM elements", document.createElement("li"), "p");
    }

    error(
        "for matching tag names",
        {
            code: "ERR_ASSERTION",
            operator: "refute.tagName"
        },
        { tagName: "li" },
        "li"
    );
});

testHelper.assertionTests("assert", "className", function(
    pass,
    fail,
    msg,
    error
) {
    msg(
        "fail without arguments",
        "[assert.className] Expected to receive at least 2 arguments"
    );

    msg(
        "fail without class name",
        "[assert.className] Expected to receive at least 2 arguments",
        { className: "" }
    );

    msg(
        "fail if object does not have className property",
        "[assert.className] Expected object to have className property",
        {},
        "item"
    );

    msg(
        "fail with custom message if object does not have className property",
        "[assert.className] Nope: Expected object to have className property",
        {},
        "item",
        "Nope"
    );

    msg(
        "fail when element does not include class name",
        "[assert.className] Expected object's className to include item but was (empty string)",
        { className: "" },
        "item"
    );

    msg(
        "fail with custom message when element does not include class name",
        "[assert.className] Come on! Expected object's className to include item but was (empty string)",
        { className: "" },
        "item",
        "Come on!"
    );

    pass("when element's class name matches", { className: "item" }, "item");
    pass(
        "when element includes class name",
        { className: "feed item" },
        "item"
    );
    fail(
        "when element does not include all class names",
        { className: "feed item" },
        "item post"
    );

    pass(
        "when element includes all class names",
        { className: "feed item post" },
        "item post"
    );

    pass(
        "when element includes all class names in different order",
        { className: "a b c d e" },
        "e a d"
    );

    pass("with class names as array", { className: "a b c d e" }, [
        "e",
        "a",
        "d"
    ]);

    if (typeof document !== "undefined") {
        var li = document.createElement("li");
        li.className = "some thing in here";

        pass("for DOM elements", li, "thing some");
    }

    error(
        "when element does not include all class names",
        {
            code: "ERR_ASSERTION",
            actual: "feed item",
            expected: "item post",
            operator: "assert.className"
        },
        { className: "feed item" },
        "item post"
    );
});

testHelper.assertionTests("refute", "className", function(
    pass,
    fail,
    msg,
    error
) {
    msg(
        "fail without arguments",
        "[refute.className] Expected to receive at least 2 arguments"
    );

    msg(
        "fail without class name",
        "[refute.className] Expected to receive at least 2 arguments",
        { className: "item" }
    );

    msg(
        "fail if object does not have className property",
        "[refute.className] Expected object to have className property",
        {},
        "item"
    );

    msg(
        "fail with custom message if object does not have className property",
        "[refute.className] Yikes: Expected object to have className property",
        {},
        "item",
        "Yikes"
    );

    pass("when element does not include class name", { className: "" }, "item");

    msg(
        "fail when element's class name matches",
        "[refute.className] Expected object's className not to include item",
        { className: "item" },
        "item"
    );

    msg(
        "fail with custom message when element's class name matches",
        "[refute.className] Noes: Expected object's className not to include item",
        { className: "item" },
        "item",
        "Noes"
    );

    fail(
        "when element includes class name",
        { className: "feed item" },
        "item"
    );
    pass(
        "when element does not include all class names",
        { className: "feed item" },
        "item post"
    );
    fail(
        "when element includes all class names",
        { className: "feed item post" },
        "item post"
    );
    fail(
        "when element includes all class names in different order",
        { className: "a b c d e" },
        "e a d"
    );
    fail("with class names as array", { className: "a b c d e" }, [
        "e",
        "a",
        "d"
    ]);
    pass("with class names as array", { className: "a b c d e" }, [
        "f",
        "a",
        "d"
    ]);

    if (typeof document !== "undefined") {
        var li = document.createElement("li");
        li.className = "some thing in here";

        pass("for DOM elements", li, "something");
    }

    error(
        "when element includes all class names",
        {
            code: "ERR_ASSERTION",
            operator: "refute.className"
        },
        { className: "feed item post" },
        "item post"
    );
});

testHelper.assertionTests("assert", "near", function(pass, fail, msg, error) {
    pass("for equal numbers", 3, 3, 0);
    fail("for numbers out of delta range", 2, 3, 0.5);
    msg(
        "fail with descriptive message",
        "[assert.near] Expected 3 to be equal to 2 +/- 0.6",
        3,
        2,
        0.6
    );
    msg(
        "fail with custom message",
        "[assert.near] Ho! Expected 3 to be equal to 2 +/- 0.6",
        3,
        2,
        0.6,
        "Ho!"
    );
    pass("for numbers in delta range", 2, 3, 1);
    msg(
        "fail if not passed arguments",
        "[assert.near] Expected to receive at least 3 arguments"
    );
    error(
        "for numbers out of delta range",
        {
            code: "ERR_ASSERTION",
            actual: 2,
            expected: 3,
            operator: "assert.near"
        },
        2,
        3,
        0.5
    );
});

testHelper.assertionTests("refute", "near", function(pass, fail, msg, error) {
    fail("for equal numbers", 3, 3, 0);
    pass("for numbers out of delta range", 2, 3, 0.5);
    msg(
        "with descriptive message",
        "[refute.near] Expected 3 not to be equal to 3 +/- 0",
        3,
        3,
        0
    );
    msg(
        "with custom message",
        "[refute.near] Hey: Expected 3 not to be equal to 3 +/- 0",
        3,
        3,
        0,
        "Hey"
    );
    fail("for numbers in delta range", 2, 3, 1);
    msg(
        "fail if not passed arguments",
        "[refute.near] Expected to receive at least 3 arguments"
    );
    error(
        "for equal numbers",
        {
            code: "ERR_ASSERTION",
            operator: "refute.near"
        },
        3,
        3,
        0
    );
});

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

testHelper.assertionTests("assert", "contains", function(
    pass,
    fail,
    msg,
    error
) {
    pass("when array contains value", [0, 1, 2], 1);
    fail("when array does not contain value", [0, 1, 2], 3);
    msg(
        "with descriptive message",
        "[assert.contains] Expected [0, 1, 2] to contain 3",
        [0, 1, 2],
        3
    );
    var thing = {};
    var someOtherThing = {};
    pass("when array contains the actual object", [thing], thing);
    fail(
        "when array contains different object with same value",
        [thing],
        someOtherThing
    );
    error(
        "when array does not contain value",
        {
            code: "ERR_ASSERTION",
            actual: [0, 1, 2],
            expected: 3,
            operator: "assert.contains"
        },
        [0, 1, 2],
        3
    );
});

testHelper.assertionTests("refute", "contains", function(
    pass,
    fail,
    msg,
    error
) {
    fail("when array contains value", [0, 1, 2], 1);
    pass("when array does not contain value", [0, 1, 2], 3);
    msg(
        "with descriptive message",
        "[refute.contains] Expected [0, 1, 2] not to contain 2",
        [0, 1, 2],
        2
    );
    var thing = {};
    var someOtherThing = {};
    fail("when array contains the actual object", [thing], thing);
    pass(
        "when array contains different object with same value",
        [thing],
        someOtherThing
    );
    error(
        "when array contains value",
        {
            code: "ERR_ASSERTION",
            operator: "refute.contains"
        },
        [0, 1, 2],
        1
    );
});

testHelper.assertionTests("assert", "json", function(pass, fail, msg, error) {
    pass("when json string equals object", '{"key":"value"}', { key: "value" });
    fail("when json string does not equal object", '{"key":"value"}', {
        key: "different"
    });
    msg(
        "with descriptive message",
        '[assert.json] Expected { key: "value" } to equal { key: "different" }',
        '{"key":"value"}',
        { key: "different" }
    );
    fail("when json string cannot be parsed", "{something:not parsable}", {});
    msg(
        "with descriptive message on parse error",
        "[assert.json] Expected {something:not parsable} to be valid JSON",
        "{something:not parsable}",
        {}
    );
    error(
        "when json string does not equal object",
        {
            code: "ERR_ASSERTION",
            actual: { key: "value" },
            expected: { key: "different" },
            operator: "assert.json"
        },
        '{"key":"value"}',
        { key: "different" }
    );
});

testHelper.assertionTests("refute", "json", function(pass, fail, msg, error) {
    fail("when json string equals object", '{"key":"value"}', { key: "value" });
    pass("when json string does not equal object", '{"key":"value"}', {
        key: "different"
    });
    msg(
        "with descriptive message",
        '[refute.json] Expected { key: "value" } not to equal { key: "value" }',
        '{"key":"value"}',
        { key: "value" }
    );
    fail("when json string cannot be parsed", "{something:not parsable}", {});
    msg(
        "with descriptive message on parse error",
        "[refute.json] Expected {something:not parsable} to be valid JSON",
        "{something:not parsable}",
        {}
    );
    error(
        "when json string equals object",
        {
            code: "ERR_ASSERTION",
            operator: "refute.json"
        },
        '{"key":"value"}',
        { key: "value" }
    );
});

testHelper.assertionTests("assert", "matchJson", function(
    pass,
    fail,
    msg,
    error
) {
    pass("when json string matches object", '{"key":"value","and":42}', {
        key: "value"
    });
    fail("when json string does not equal object", '{"key":"value","and":42}', {
        key: "different"
    });
    msg(
        "with descriptive message",
        '[assert.matchJson] Expected { key: "value" } to match { key: "different" }',
        '{"key":"value","and":42}',
        { key: "different" }
    );
    fail("when json string cannot be parsed", "{something:not parsable}", {});
    msg(
        "with descriptive message on parse error",
        "[assert.matchJson] Expected {something:not parsable} to be valid JSON",
        "{something:not parsable}",
        {}
    );
    error(
        "when json string does not equal object",
        {
            code: "ERR_ASSERTION",
            actual: { key: "value", and: 42 },
            expected: { key: "different", and: 42 },
            operator: "assert.matchJson"
        },
        '{"key":"value","and":42,"ignoring":true}',
        { key: "different", and: 42 }
    );
});

testHelper.assertionTests("refute", "matchJson", function(
    pass,
    fail,
    msg,
    error
) {
    fail("when json string equals object", '{"key":"value","and":42}', {
        key: "value"
    });
    pass("when json string does not equal object", '{"key":"value","and":42}', {
        key: "different"
    });
    msg(
        "with descriptive message",
        '[refute.matchJson] Expected { key: "value" } not to match { key: "value" }',
        '{"key":"value","and":42}',
        { key: "value" }
    );
    fail("when json string cannot be parsed", "{something:not parsable}", {});
    msg(
        "with descriptive message on parse error",
        "[refute.matchJson] Expected {something:not parsable} to be valid JSON",
        "{something:not parsable}",
        {}
    );
    error(
        "when json string equals object",
        {
            code: "ERR_ASSERTION",
            operator: "refute.matchJson"
        },
        '{"key":"value","and":42}',
        { key: "value" }
    );
});

testHelper.assertionTests("assert", "hasArity", function(
    pass,
    fail,
    msg,
    error
) {
    function arityZero() {
        return undefined;
    }

    function arityOne(one) {
        return one;
    }

    function arityTwo(one, two) {
        return one + two;
    }

    function arityThree(one, two, three) {
        return one + two + three;
    }

    function arityFour(one, two, three, four) {
        return one + two + three + four;
    }

    function arityFive(one, two, three, four, five) {
        return one + two + three + four + five;
    }

    function aritySix(one, two, three, four, five, six) {
        return one + two + three + four + five + six;
    }

    pass("when function has arity 0", arityZero, 0);
    pass("when function has arity 1", arityOne, 1);
    pass("when function has arity 2", arityTwo, 2);
    pass("when function has arity 3", arityThree, 3);
    pass("when function has arity 4", arityFour, 4);
    pass("when function has arity 5", arityFive, 5);
    pass("when function has arity 6", aritySix, 6);

    fail("when function arity does not match", arityOne, 0);

    msg(
        "with descriptive message",
        "[assert.hasArity] Expected arityOne to have arity of 0 but was 1",
        arityOne,
        0
    );

    fail("when arity does not match", arityOne, 0);
    fail("when arity does not match", arityTwo, 1);
    fail("when arity does not match", arityThree, 2);
    error(
        "for mismatched arity",
        {
            actual: arityOne,
            expected: 2,
            code: "ERR_ASSERTION",
            operator: "assert.hasArity"
        },
        arityOne,
        2
    );
});

testHelper.assertionTests("refute", "hasArity", function(
    pass,
    fail,
    msg,
    error
) {
    function arityZero() {
        return undefined;
    }

    function arityOne(one) {
        return one;
    }

    function arityTwo(one, two) {
        return one + two;
    }

    function arityThree(one, two, three) {
        return one + two + three;
    }

    function arityFour(one, two, three, four) {
        return one + two + three + four;
    }

    function arityFive(one, two, three, four, five) {
        return one + two + three + four + five;
    }

    function aritySix(one, two, three, four, five, six) {
        return one + two + three + four + five + six;
    }

    pass("when function has arity 0", arityZero, 99);
    pass("when function has arity 1", arityOne, 99);
    pass("when function has arity 2", arityTwo, 99);
    pass("when function has arity 3", arityThree, 99);
    pass("when function has arity 4", arityFour, 99);
    pass("when function has arity 5", arityFive, 99);
    pass("when function has arity 6", aritySix, 99);

    fail("when function arity matches", arityOne, 1);

    msg(
        "with descriptive message",
        "[refute.hasArity] Expected arityOne to not have arity of 1",
        arityOne,
        1
    );

    fail("when arity matches", arityOne, 1);
    fail("when arity matches", arityTwo, 2);
    fail("when arity matches", arityThree, 3);
    error(
        "for matched arity",
        {
            code: "ERR_ASSERTION",
            operator: "refute.hasArity"
        },
        arityOne,
        1
    );
});
