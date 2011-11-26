if (typeof require == "function") {
    var buster = { assertions: require("../buster-assertions") };
}

(function (ba) {
    var toString = Object.prototype.toString;

    ba.add("isTrue", {
        assert: function (actual) {
            return actual === true;
        },
        assertMessage: "Expected ${0} to be true",
        refuteMessage: "Expected ${0} to not be true",
        expectation: "toBeTrue"
    });

    ba.add("isFalse", {
        assert: function (actual) {
            return actual === false;
        },
        assertMessage: "Expected ${0} to be false",
        refuteMessage: "Expected ${0} to not be false",
        expectation: "toBeFalse"
    });

    function actualAndTypeOfMessageValues(actual) {
        return [actual, typeof actual];
    }

    ba.add("isString", {
        assert: function (actual) {
            return typeof actual == "string";
        },
        assertMessage: "Expected ${0} (${1}) to be string",
        refuteMessage: "Expected ${0} not to be string",
        expectation: "toBeString",
        values: actualAndTypeOfMessageValues
    });

    ba.add("isFunction", {
        assert: function (actual) {
            return typeof actual == "function";
        },
        assertMessage: "Expected ${0} (${1}) to be function",
        refuteMessage: "Expected ${0} not to be function",
        expectation: "toBeFunction",
        values: function (actual) {
            return [("" + actual).replace("\n", ""), typeof actual];
        }
    });

    ba.add("isBoolean", {
        assert: function (actual) {
            return typeof actual == "boolean";
        },
        assertMessage: "Expected ${0} (${1}) to be boolean",
        refuteMessage: "Expected ${0} not to be boolean",
        expectation: "toBeBoolean",
        values: actualAndTypeOfMessageValues
    });

    ba.add("isNumber", {
        assert: function (actual) {
            return typeof actual == "number" && !isNaN(actual);
        },
        assertMessage: "Expected ${0} (${1}) to be a non-NaN number",
        refuteMessage: "Expected ${0} to be NaN or another non-number value",
        expectation: "toBeNumber",
        values: actualAndTypeOfMessageValues
    });

    ba.add("isNaN", {
        assert: function (actual) {
            return typeof actual == "number" && isNaN(actual);
        },
        assertMessage: "Expected ${0} to be NaN",
        refuteMessage: "Expected not to be NaN",
        expectation: "toBeNaN"
    });

    ba.add("isArray", {
        assert: function (actual) {
            return toString.call(actual) == "[object Array]";
        },
        assertMessage: "Expected ${0} to be array",
        refuteMessage: "Expected ${0} not to be array",
        expectation: "toBeArray"
    });

    function isArrayLike(object) {
        return toString.call(object) == "[object Array]" ||
            (!!object && typeof object.length == "number" &&
            typeof object.splice == "function") ||
            ba.isArguments(object);
    }

    ba.isArrayLike = isArrayLike;

    ba.add("isArrayLike", {
        assert: function (actual) {
            return isArrayLike(actual);
        },
        assertMessage: "Expected ${0} to be array like",
        refuteMessage: "Expected ${0} not to be array like",
        expectation: "toBeArrayLike"
    });

    ba.add("inDelta", {
        assert: function (actual, expected, delta) {
            return Math.abs(actual - expected) <= delta;
        },
        assertMessage: "Expected ${0} to be equal to ${1} +/- ${2}",
        refuteMessage: "Expected ${0} not to be equal to ${1} +/- ${2}",
        expectation: "toBeInDelta"
    });

    ba.add("hasPrototype", {
        assert: function (actual, protoObj) {
            return protoObj.isPrototypeOf(actual);
        },
        assertMessage: "Expected ${0} to have ${1} on its prototype chain",
        refuteMessage: "Expected ${0} not to have ${1} on its prototype chain",
        expectation: "toHavePrototype"
    });
}(buster.assertions));
