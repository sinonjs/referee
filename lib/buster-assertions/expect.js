if (typeof module == "object" && typeof require == "function") {
    var buster = require("buster-core");
    buster.assert = require("../buster-assertions");
}

buster.expect = function (actual) {
    var expectation = buster.create(buster.expect.expectation);
    expectation.actual = actual;

    return expectation;
};

buster.expect.expectation = {};

(function () {
    var names = {
        "equals": "toEqual",
        "notEquals": "toNotEqual",
        "same": "toBeSameAs",
        "notSame": "toNotBeSameAs",
        "true": "toBeTrue",
        "false": "toBeFalse",
        "typeOf": "toBeType",
        "notTypeOf": "toNotBeType",
        "isString": "toBeString",
        "isObject": "toBeObject",
        "isFunction": "toBeFunction",
        "isBoolean": "toBeBoolean",
        "isUndefined": "toBeUndefined",
        "isNotUndefined": "toNotBeUndefined",
        "isNull": "toBeNull",
        "isNotNull": "toNotBeNull",
        "isNaN": "toBeNaN",
        "isNotNaN": "toNotBeNaN",
        "isArray": "toBeArray",
        "isNotArray": "toNotBeArray",
        "isArrayLike": "toBeArrayLike",
        "isNotArrayLike": "toNotBeArrayLike",
        "match": "toMatch",
        "noMatch": "toNotMatch",
        "exception": "toThrow",
        "noException": "toNotThrow",
        "tagName": "toHaveTagName",
        "noTagName": "toNotHaveTagName",
        "className": "toHaveClassName",
        "noClassName": "toNotHaveClassName",
        "inDelta": "toBeInDelta",
        "notInDelta": "toNotBeInDelta"
    };

    function buildExpectation(assertion, expectation) {
        buster.expect.expectation[expectation] = function () {
            var args = [this.actual].concat(Array.prototype.slice.call(arguments));
            return buster.assert[assertion].apply(buster.assert, args);
        };
    }

    // for (var prop in buster.assert) {
    //     if (typeof buster.assert[prop] != "function") {
    //         continue;
    //     }

    //     if (prop != "create" && prop != "addListener" && prop != "on" &&
    //         prop != "removeListener" && prop != "hasListener" &&
    //         prop != "emit" && prop != "bind" && prop != "fail" &&
    //         prop != "format") {
    //         buildAssertion(prop);
    //     }
    // }

    for (var name in names) {
        buildExpectation(name, names[name]);
    }
}());

if (typeof module == "object") {
    module.exports = buster.assert.that;
}
