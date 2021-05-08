# referee

A collection of assertions to be used with a unit testing framework. **referee** works well with any CommonJS compliant testing framework out of the box, and can easily be configured to work with most any testing framework. See also expectations if you like the alternative API
(`expect(thing).toBe*`).

**referee** contains lots of assertions. We strongly believe that high-level assertions are essential in the interest of producing clear and intent-revealing tests, and they also give you to-the-point failure messages.

## Install

```shell
npm install @sinonjs/referee --save-dev
```

### [Sinon.JS](https://sinonjs.org) integration

You can extend **referee** with assertions that integrates with [Sinon.JS](https://sinonjs.org)

See [referee-sinon](https://github.com/sinonjs/referee-sinon)

## Assertions and refutations

Unlike most assertion libraries, **referee** does not have `assert.notXyz` assertions to refute some fact. Instead, it has _refutations_, heavily inspired by Ruby's [minitest](http://bfts.rubyforge.org/minitest/):

```js
var assert = referee.assert;
var refute = referee.refute;

assert.equals(42, 42);
refute.equals(42, 43);
```

Refutations help express "assert not ..." style verification in a much clearer way. It also brings with it a nice consistency in that any `assert.xyz` always has a corresponding `refute.xyz` that does the opposite check.

### `assert()`

```js
assert(actual[, message]);
```

Fails if `actual` is falsy (`0`, `""`, `null`, `undefined`, `NaN`). Fails with either the provided message or "Expected null to be truthy". This behavior differs from all other assertions, which prepend the optional message argument.

```js
assert({ not: "Falsy" }, "This will pass");
assert(null, "This will fail"); // Fails with custom message
assert(null); // Fails
assert(34); // Passes
```

### `refute()`

```js
refute(actual[, message])
```

Fails if actual is truthy. Fails with either the provided message or "Expected null to be falsy". This behavior differs from all other refutations, which prepend the optional message argument.

```js
refute({ not: "Falsy" }, "This will fail"); // Fails with custom message
refute(null, "This will pass");
refute(null); // Passes
refute(34); // Fails
```

## Predefined Assertions

The following assertions can be used with `assert` and `refute`. They
are described for `assert`, but the corresponding failure messages for
`refute` are also mentioned. For `refute` the behaviour is exactly
opposed.

All assertions support an optional `message` argument, which is
prepended to the failure message.

### Overview

#### Any

- [`equals()`](#equals)
- [`match()`](#match)
- [`same()`](#same)

#### String

- [`json()`](#json)
- [`matchJson()`](#matchjson)

#### Number

- [`greater()`](#greater)
- [`less()`](#less)
- [`near()`](#near)

#### Function

- [`exception()`](#exception)
- [`hasArity()`](#hasarity)

#### Object

- [`hasPrototype()`](#hasprototype)

#### Array and array like

- [`contains()`](#contains)

#### DOM element

- [`tagName()`](#tagname)
- [`className()`](#classname)

#### Promise

- [`resolves`](#resolves)
- [`rejects`](#rejects)

#### Types and values

These assertions are for checking for built-in types and values.

- [`isUndefined()`](#isundefined)
- [`isNull()`](#isnull)
- [`isArray()`](#isarray)
- [`isArrayBuffer()`](#isarraybuffer)
- [`isArrayLike()`](#isarraylike)
- [`isBoolean()`](#isboolean)
- [`isDataView()`](#isdataview)
- [`isDate()`](#isdate)
- [`isError()`](#iserror)
- [`isEvalError()`](#isevalerror)
- [`isFalse()`](#isfalse)
- [`isFloat32Array()`](#isfloat32array)
- [`isFloat64Array()`](#isfloat64array)
- [`isFunction()`](#isfunction)
- [`isInfinity()`](#isinfinity)
- [`isIntlCollator()`](#isintlcollator)
- [`isIntlDateTimeFormat()`](#isintldatetimeformat)
- [`isIntlNumberFormat()`](#isintlnumberformat)
- [`isMap()`](#ismap)
- [`isNaN()`](#isnan)
- [`isNegativeInfinity()`](#isnegativeinfinity)
- [`isNumber()`](#isnumber)
- [`isObject()`](#isobject)
- [`isPromise()`](#ispromise)
- [`isRangeError()`](#israngeerror)
- [`isReferenceError()`](#isreferenceerror)
- [`isRegExp()`](#isregexp)
- [`isSet()`](#isset)
- [`isString()`](#isstring)
- [`isSymbol()`](#issymbol)
- [`isSyntaxError()`](#issyntaxerror)
- [`isTrue()`](#istrue)
- [`isTypeError()`](#istypeerror)
- [`isUint16Array()`](#isuint16array)
- [`isUint32Array()`](#isuint32array)
- [`isUint8Array()`](#isuint8array)
- [`isUint8Array()`](#isuint8array)
- [`isUint8clampedArray()`](#isuint8clampedarray)
- [`isURIError()`](#isurierror)
- [`isWeakMap()`](#isweakmap)
- [`isWeakSet()`](#isweakset)

### `same()`

```js
assert.same(actual, expected[, message])
```

Fails if `actual` is not the same object (`===`) as `expected`. To compare similar objects, such as { name: "Chris", id: 42 } and { id: 42, name: "Chris" } (not the same instance), see [`equals()`](#equals).

```js
var obj = { id: 42, name: "Chris" };
assert.same(obj, obj); // Passes
assert.same(obj, { id: 42, name: "Chris" }); // Fails
```

#### Messages

```js
assert.same.message = "${actual} expected to be the same object as ${expected}";
refute.same.message =
  "${actual} expected not to be the same object as ${expected}";
```

### `equals()`

```js
assert.equals(actual, expected[, message])
```

Compares `actual` to `expected` property by property. If the property count does not match, or if any of `actual`‘s properties do not match the corresponding property in `expected`, the assertion fails. Object properties are verified recursively.

If `actual` is `null` or `undefined`, an exact match is required. Date objects are compared by their `getTime` method. Regular expressions are compared by their string representations. Primitives are compared using `==`, i.e., with coercion.

`equals` passes when comparing an arguments object to an array if the both contain the same elements.
Objects or arrays may contain the result of calling `match` to compare a property using a built-in or custom matcher.

```js
assert.equals({ name: "Professor Chaos" }, { name: "Professor Chaos" }); // Passes
assert.equals({ name: "Professor Chaos" }, { name: match.string }); // Passes
assert.equals({ name: "Professor Chaos" }, { name: "Dr Evil" }); // Fails
assert.equals({ name: "Professor Chaos" }, { name: match.number }); // Fails
```

#### Messages

```js
assert.equals.message = "${actual} expected to be equal to ${expected}";
refute.equals.message = "${actual} expected not to be equal to ${expected}";
```

### `greater()`

```js
assert.greater(actual, expected[, message])
```

Fails if `actual` is equal to or less than `expected`.

```js
assert.greater(2, 1); // Passes
assert.greater(1, 1); // Fails
assert.greater(1, 2); // Fails
```

#### Messages

```js
assert.greater.message = "Expected ${actual} to be greater than ${expected}";
refute.greater.message =
  "Expected ${actual} to be less than or equal to ${expected}";
```

### `less()`

```js
assert.less(actual, expected[, message])
```

Fails if `actual` is equal to or greater than `expected`.

```js
assert.less(1, 2); // Passes
assert.less(1, 1); // Fails
assert.less(2, 1); // Fails
```

#### Messages

```js
assert.less.message = "Expected ${actual} to be less than ${expected}";
refute.less.message =
  "Expected ${actual} to be greater than or equal to ${expected}";
```

### `isUndefined()`

```js
assert.isUndefined(object[, message])
```

Fails if `object` is not `undefined`.

```js
assert.isUndefined(undefined); // Passes
assert.isUndefined({}); // Fails
refute.isUndefined({}); // Passes
refute.isUndefined(undefined); // Fails
```

#### Messages

```js
assert.isUndefined.message = "Expected ${actual} to be undefined";
refute.isUndefined.message = "Expected not to be undefined";
```

### `isNull()`

```js
assert.isNull(object[, message])
```

Fails if `object` is not `null`.

```js
assert.isNull(null); // Passes
assert.isNull({}); // Fails
refute.isNull({}); // Passes
refute.isNull(null); // Fails
```

#### Messages

```js
assert.isNull.message = "Expected ${actual} to be null";
refute.isNull.message = "Expected not to be null";
```

### `match()`

```js
assert.match(actual, matcher[, message])
```

Fails if `matcher` is not a partial match for `actual`. Accepts a wide range of input combinations. Note that `assert.match` is not symmetric - in some cases `assert.match(a, b)` may pass while `assert.match(b, a)` fails.

#### String matcher

In its simplest form, `assert.match` performs a case insensitive substring match. When the matcher is a string, the `actual` object is converted to a string, and the assertion passes if `actual` is a case-insensitive substring of expected as a string.

```js
assert.match("Give me something", "Give"); // Passes
assert.match("Give me something", "sumptn"); // Fails
assert.match(
  {
    toString: function () {
      return "yeah";
    },
  },
  "Yeah!"
); // Passes
```

The last example is not symmetric. When the matcher is a string, the actual value is coerced to a string - in this case using `toString`. Changing the order of the arguments would cause the matcher to be an object, in which case different rules apply (see below).

#### Boolean matcher

Performs a strict (i.e. `===`) match with the object. So, only `true` matches `true`, and only `false` matches `false`.

#### Regular expression matcher

When the matcher is a regular expression, the assertion will pass if `expected.test(actual)` is `true`. `assert.match` is written in a generic way, so any object with a `test` method will be used as a matcher this way.

```js
assert.match("Give me something", /^[a-z\s]$/i); // Passes
assert.match("Give me something", /[0-9]/); // Fails
assert.match(
  {
    toString: function () {
      return "yeah!";
    },
  },
  /yeah/
); // Passes
assert.match(234, /[a-z]/); // Fails
```

#### Number matcher

When the matcher is a number, the assertion will pass if `matcher == actual`.

```js
assert.match("123", 123); // Passes
assert.match("Give me something", 425); // Fails
assert.match(
  {
    toString: function () {
      return "42";
    },
  },
  42
); // Passes
assert.match(234, 1234); // Fails
```

#### Function matcher

When the matcher is a function, it is called with `actual` as its only argument. The assertion will pass if the function returns `true`. A strict match is performed against the return value, so a boolean `true` is required, truthy is not enough.

```js
// Passes
assert.match("123", function (exp) {
  return exp == "123";
});

// Fails
assert.match("Give me something", function () {
  return "ok";
});

// Passes
assert.match(
  {
    toString: function () {
      return "42";
    },
  },
  function () {
    return true;
  }
);

// Fails
assert.match(234, function () {});
```

#### Object matcher

As mentioned above, if an object matcher defines a test method the assertion will pass if `matcher.test(actual)` returns truthy. If the object does not have a `test` method, a recursive match is performed. If all properties of `matcher` matches corresponding properties in `actual`, the assertion passes. Note that the object matcher does not care if the number of properties in the two objects are the same - only if all properties in the matcher recursively “matches” ones in the actual object.

```js
// Passes
assert.match("123", {
  test: function (arg) {
    return arg == 123;
  },
});

// Fails
assert.match({}, { prop: 42 });

// Passes
assert.match(
  {
    name: "Chris",
    profession: "Programmer",
  },
  {
    name: "Chris",
  }
);

// Fails
assert.match(234, {
  name: "Chris",
});
```

#### DOM elements

`assert.match` can be very helpful when asserting on DOM elements, because it allows you to compare several properties with one assertion:

```js
var el = document.getElementById("myEl");

assert.match(el, {
  tagName: "h2",
  className: "item",
  innerHTML: "Howdy",
});
```

### `isObject()`

```js
assert.isObject(object[, message])
```

Fails if `object` is not an object or if it is `null`.

```js
assert.isObject({}); // Passes
assert.isObject(42); // Fails
assert.isObject([1, 2, 3]); // Passes
assert.isObject(function () {}); // Fails
```

#### Messages

```js
assert.isObject.message =
  "${actual} (${actualType}) expected to be object and not null";
refute.isObject.message = "${actual} expected to be null or not an object";
```

### `isFunction()`

```js
assert.isFunction(actual[, message])
```

Fails if `actual` is not a function.

```js
assert.isFunction({}); // Fails
assert.isFunction(42); // Fails
assert.isFunction(function () {}); // Passes
```

#### Messages

```js
assert.isFunction.message = "${actual} (${actualType}) expected to be function";
refute.isFunction.message = "${actual} expected not to be function";
```

### `isTrue()`

```js
assert.isTrue(actual[, message])
```

Fails if `actual` is not `true`.

```js
assert.isTrue("2" == 2); // Passes
assert.isTrue("2" === 2); // Fails
```

#### Messages

```js
assert.isTrue.message = "Expected ${actual} to be true";
refute.isTrue.message = "Expected ${actual} to not be true";
```

### `isFalse()`

```js
assert.isFalse(actual[, message])
```

Fails if `actual` is not `false`.

```js
assert.isFalse("2" === 2); // Passes
assert.isFalse("2" == 2); // Fails
```

#### Messages

```js
assert.isFalse.message = "Expected ${actual} to be false";
refute.isFalse.message = "Expected ${actual} to not be false";
```

### `isString()`

```js
assert.isString(actual[, message])
```

Fails if the type of actual is not "string".

```js
assert.isString("2"); // Passes
assert.isString(2); // Fails
```

#### Messages

```js
assert.isString.message = "Expected ${actual} (${actualType}) to be string";
refute.isString.message = "Expected ${actual} not to be string";
```

### `isBoolean()`

```js
assert.isBoolean(actual[, message])
```

Fails if the type of `actual` is not "boolean".

```js
assert.isBoolean(true); // Passes
assert.isBoolean(2 < 2); // Passes
assert.isBoolean("true"); // Fails
```

#### Messages

```js
assert.isBoolean.message = "Expected ${actual} (${actualType}) to be boolean";
refute.isBoolean.message = "Expected ${actual} not to be boolean";
```

### `isNumber()`

```js
assert.isNumber(actual[, message])
```

Fails if the type of `actual` is not "number" or is `NaN`.

```js
assert.isNumber(12); // Passes
assert.isNumber("12"); // Fails
assert.isNumber(NaN); // Fails
```

#### Messages

```js
assert.isNumber.message =
  "Expected ${actual} (${actualType}) to be a non-NaN number";
refute.isNumber.message = "Expected ${actual} to be NaN or a non-number value";
```

### `isNaN()`

```js
assert.isNaN(actual[, message])
```

Fails if `actual` is not `NaN`. Does not perform coercion in contrast to the standard javascript function `isNaN`.

```js
assert.isNaN(NaN); // Passes
assert.isNaN("abc" / "def"); // Passes
assert.isNaN(12); // Fails
assert.isNaN({}); // Fails, would pass for standard javascript function isNaN
```

#### Messages

```js
assert.isNaN.message = "Expected ${actual} to be NaN";
refute.isNaN.message = "Expected not to be NaN";
```

### `isNegativeInfinity()`

```js
assert.isNegativeInfinity(actual[, message])
```

Fails if `actual` is not `-Infinity`.

```js
assert.isNegativeInfinity(-Infinity); // Passes
assert.isNegativeInfinity(42); // Fails
```

### `isArray()`

```js
assert.isArray(actual[, message])
```

Fails if the object type of `actual` is not `Array`.

```js
assert.isArray([1, 2, 3]); // Passes
assert.isArray({}); // Fails
```

#### Messages

```js
assert.isArray.message = "Expected ${actual} to be array";
refute.isArray.message = "Expected ${actual} not to be array";
```

### `isArrayBuffer()`

```js
assert.isArrayBuffer(actual[, message])
```

Fails if the object type of `actual` is not `ArrayBuffer`.

```js
assert.isArrayBuffer(new ArrayBuffer(8)); // Passes
assert.isArrayBuffer({}); // Fails
```

#### Messages

```js
assert.isArrayBuffer.message = "Expected ${actual} to be an ArrayBuffer";
refute.isArrayBuffer.message = "Expected ${actual} not to be an ArrayBuffer";
```

### `isArrayLike()`

```js
assert.isArrayLike(actual[, message])
```

Fails if none of the following conditions are fulfilled:

- the object type of `actual` is `Array`
- `actual` is an `arguments` object
- `actual` is an object providing a property `length` of type "number" and a `property` splice of type "function"

```js
assert.isArrayLike([1, 2, 3]); // Passes
assert.isArrayLike(arguments); // Passes
assert.isArrayLike({ length: 0, splice: function () {} }); // Passes
assert.isArrayLike({}); // Fails
```

#### Messages

```js
assert.isArrayLike.message = "Expected ${actual} to be array like";
refute.isArrayLike.message = "Expected ${actual} not to be array like";
```

### `isDataView()`

```js
assert.isDataView(actual[, message])
```

Fails if the object type of `actual` is not `DataView`.

```js
assert.isDataView(new DataView(new ArrayBuffer(16)); // Passes
assert.isDataView({});                               // Fails
```

#### Messages

```js
assert.isDataView.message = "Expected ${actual} to be a DataView";
refute.isDataView.message = "Expected ${actual} not to be a DataView";
```

### `isDate()`

```js
assert.isDate(actual[, message])
```

Fails if `actual` is not an instance of `Date`.

```js
assert.isDate(new Date()); // Passes
assert.isDate(12345678); // Fails
assert.isDate("apple pie"); // Fails
```

#### Messages

```js
assert.isDate.message = "Expected ${actual} to be a Date";
refute.isDate.message = "Expected ${actual} not to be a Date";
```

### `isError()`

```js
assert.isError(actual[, message])
```

Fails if `actual` is not an instance of `Error`.
Passes for all [built in error types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types) and errors derived from a built in error type.

```js
assert.isError(new Error("this is an error"); // Passes
assert.isError("this is not an error");       // Fails
```

#### Messages

```js
assert.isError.message = "Expected ${actual} to be an Error";
refute.isError.message = "Expected ${actual} not to be an Error";
```

### `isEvalError()`

```js
assert.isEvalError(actual[, message])
```

Fails if `actual` is not an instance of `EvalError`.

```js
assert.isEvalError(new EvalError("this is an eval error")); // Passes
assert.isEvalError(new Error("this is not an eval error")); // Fails
```

#### Messages

```js
assert.isEvalError.message = "Expected ${actual} to be an EvalError";
refute.isEvalError.message = "Expected ${actual} not to be an EvalError";
```

### `isFloat32Array()`

```js
assert.isFloat32Array(actual[, message])
```

Fails if `actual` is not an instance of `Float32Array`.

```js
assert.isFloat32Array(new Float32Array(2)); // Passes
assert.isFloat32Array(new Float64Array(2)); // Fails
```

#### Messages

```js
assert.isFloat32Array.message = "Expected ${actual} to be a Float32Array";
refute.isFloat32Array.message = "Expected ${actual} not to be n Float32Array";
```

### `isFloat64Array()`

```js
assert.isFloat64Array(actual[, message])
```

Fails if `actual` is not an instance of `Float64Array`.

```js
assert.isFloat64Array(new Float64Array(2)); // Passes
assert.isFloat64Array(new Float32Array(2)); // Fails
```

#### Messages

```js
assert.isFloat64Array.message = "Expected ${actual} to be a Float64Array";
refute.isFloat64Array.message = "Expected ${actual} not to be a Float64Array";
```

### `isInfinity()`

```js
assert.isInfinity(actual[, message])
```

Fails if `actual` is not `Infinity`.

```js
assert.isInfinity(Infinity); // Passes
assert.isInfinity(42); // Fails
```

#### Messages

```js
assert.isInfinity.message = "Expected ${actual} to be Infinity";
refute.isInfinity.message = "Expected ${actual} not to be Infinity";
```

### `isInt8Array()`

```js
assert.isInt8Array(actual[, message])
```

Fails if `actual` is not an instance of `Int8Array`.

```js
assert.isInt8Array(new Int8Array(2)); // Passes
assert.isInt8Array(new Int16Array(2)); // Fails
```

#### Messages

```js
assert.isInt8Array.message = "Expected ${actual} to be an Int8Array";
refute.isInt8Array.message = "Expected ${actual} not to be an Int8Array";
```

### `isInt16Array()`

```js
assert.isInt16Array(actual[, message])
```

Fails if `actual` is not an instance of `Int16Array`.

```js
assert.isInt16Array(new Int16Array(2)); // Passes
assert.isInt16Array(new Int32Array(2)); // Fails
```

#### Messages

```js
assert.isInt16Array.message = "Expected ${actual} to be an Int16Array";
refute.isInt16Array.message = "Expected ${actual} not to be an Int16Array";
```

### `isInt32Array()`

```js
assert.isInt32Array(actual[, message])
```

Fails if `actual` is not an instance of `Int32Array`.

```js
assert.isInt32Array(new Int32Array(2)); // Passes
assert.isInt32Array(new Int16Array(2)); // Fails
```

#### Messages

```js
assert.isInt32Array.message = "Expected ${actual} to be an Int32Array";
refute.isInt32Array.message = "Expected ${actual} not to be an Int32Array";
```

### `isIntlCollator()`

```js
assert.isIntlCollator(actual[, message])
```

Fails if `actual` is not an instance of `Intl.Collator`.

```js
assert.isIntlCollator(new Intl.Collator()); // Passes
assert.isIntlCollator({}); // Fails
```

#### Messages

```js
assert.isIntlCollator.message = "Expected ${actual} to be an Intl.Collator";
refute.isIntlCollator.message = "Expected ${actual} not to be an Intl.Collator";
```

### `isIntlDateTimeFormat()`

```js
assert.isIntlDateTimeFormat(actual[, message])
```

Fails if `actual` is not an instance of `Intl.DateTimeFormat`.

```js
assert.isIntlDateTimeFormat(new Intl.DateTimeFormat()); // Passes
assert.isIntlDateTimeFormat({}); // Fails
```

#### Messages

```js
assert.isIntlDateTimeFormat.message =
  "Expected ${actual} to be an Intl.DateTimeFormat";
refute.isIntlDateTimeFormat.message =
  "Expected ${actual} not to be an Intl.DateTimeFormat";
```

### `isIntlNumberFormat()`

```js
assert.isIntlNumberFormat(actual[, message])
```

Fails if `actual` is not an instance of `Intl.NumberFormat`.

```js
assert.isIntlNumberFormat(new Intl.NumberFormat()); // Passes
assert.isIntlNumberFormat({}); // Fails
```

#### Messages

```js
assert.isIntlNumberFormat.message =
  "Expected ${actual} to be an Intl.NumberFormat";
refute.isIntlNumberFormat.message =
  "Expected ${actual} not to be an Intl.NumberFormat";
```

### `isMap()`

```js
assert.Map(actual[, message])
```

Fails if `actual` is not an instance of `Map`.

```js
assert.isMap(new Map()); // Passes
assert.isMap({}); // Fails
```

#### Messages

```js
assert.isMap.message = "Expected ${actual} to be a Map";
refute.isMap.message = "Expected ${actual} not to be a Map";
```

### `isPromise()`

```js
assert.Promise(actual[, message])
```

Fails if `actual` is not an instance of `Promise`.

```js
assert.isPromise(new Promise()); // Passes
assert.isPromise({}); // Fails
```

#### Messages

```js
assert.isPromise.message = "Expected ${actual} to be a Promise";
refute.isPromise.message = "Expected ${actual} not to be a Promise";
```

### `isRangeError()`

```js
assert.isRangeError(actual[, message])
```

Fails if `actual` is not an instance of `RangeError`.

```js
assert.isRangeError(new RangeError("this is a range error")); // Passes
assert.isRangeError(new Error("this is not a range error")); // Fails
```

#### Messages

```js
assert.isRangeError.message = "Expected ${actual} to be an RangeError";
refute.isRangeError.message = "Expected ${actual} not to be an RangeError";
```

### `isReferenceError()`

```js
assert.isReferenceError(actual[, message])
```

Fails if `actual` is not an instance of `ReferenceError`.

```js
assert.isReferenceError(new ReferenceError("this is a range error")); // Passes
assert.isReferenceError(new Error("this is not a range error")); // Fails
```

#### Messages

```js
assert.isReferenceError.message = "Expected ${actual} to be a ReferenceError";
refute.isReferenceError.message =
  "Expected ${actual} not to be a ReferenceError";
```

### `isRegExp()`

```js
assert.isRegExp(actual[, message])
```

Fails if `actual` is not an instance of `RegExp`.

```js
assert.isRegExp(new RegExp("apple pie")); // Passes
assert.isRegExp(/apple pie/); // Passes
assert.isRegExp("apple pie"); // Fails
```

#### Messages

```js
assert.isRegExp.message = "Expected ${actual} to be an RegExp";
refute.isRegExp.message = "Expected ${actual} not to be an RegExp";
```

### `isSet()`

```js
assert.isSet(actual[, message])
```

Fails if `actual` is not an instance of `Set`.

```js
assert.isSet(new Set()); // Passes
assert.isSet([]); // Fails
```

#### Messages

```js
assert.isSet.message = "Expected ${actual} to be a Set";
refute.isSet.message = "Expected ${actual} not to be a Set";
```

### `isSymbol()`

```js
assert.isSymbol(actual[, message])
```

Fails if `actual` is not a value of type `Symbol`.

```js
assert.isSymbol(Symbol("apple pie")); // Passes
assert.isSymbol("apple pie"); // Fails
```

#### Messages

```js
assert.isSymbol.message = "Expected ${actual} to be a Symbol";
refute.isSymbol.message = "Expected ${actual} not to be a Symbol";
```

### `isSyntaxError()`

```js
assert.isSyntaxError(actual[, message])
```

Fails if `actual` is not an instance of `SyntaxError`.

```js
assert.isSyntaxError(new SyntaxError("this is a syntax error")); // Passes
assert.isSyntaxError(new Error("this is not a syntax error")); // Fails
```

#### Messages

```js
assert.isSyntaxError.message = "Expected ${actual} to be a SyntaxError";
refute.isSyntaxError.message = "Expected ${actual} not to be a SyntaxError";
```

### `isTypeError()`

```js
assert.isTypeError(actual[, message])
```

Fails if `actual` is not an instance of `TypeError`.

```js
assert.isTypeError(new TypeError("this is a type error")); // Passes
assert.isTypeError(new Error("this is not a type error")); // Fails
```

#### Messages

```js
assert.isTypeError.message = "Expected ${actual} to be a TypeError";
refute.isTypeError.message = "Expected ${actual} not to be a TypeError";
```

### `isURIError()`

```js
assert.isURIError(actual[, message])
```

Fails if `actual` is not an instance of `URIError`.

```js
assert.isURIError(new URIError("this is a uri error")); // Passes
assert.isURIError(new Error("this is not a uri error")); // Fails
```

#### Messages

```js
assert.isURIError.message = "Expected ${actual} to be a URIError";
refute.isURIError.message = "Expected ${actual} not to be a URIError";
```

### `isUint16Array()`

```js
assert.isUint16Array(actual[, message])
```

Fails if `actual` is not an instance of `Uint16Array`.

```js
assert.isUint16Array(new Uint16Array()); // Passes
assert.isUint16Array(new Uint32Array()); // Fails
assert.isUint16Array(new Uint8Array()); // Fails
```

#### Messages

```js
assert.isUint16Array.message = "Expected ${actual} to be a Uint16Array";
refute.isUint16Array.message = "Expected ${actual} not to be a Uint16Array";
```

### `isUint32Array()`

```js
assert.isUint32Array(actual[, message])
```

Fails if `actual` is not an instance of `Uint32Array`.

```js
assert.isUint32Array(new Uint16Array()); // Fails
assert.isUint32Array(new Uint32Array()); // Passes
assert.isUint32Array(new Uint8Array()); // Fails
```

#### Messages

```js
assert.isUint32Array.message = "Expected ${actual} to be a Uint32Array";
refute.isUint32Array.message = "Expected ${actual} not to be a Uint32Array";
```

### `isUint8Array()`

```js
assert.isUint8Array(actual[, message])
```

Fails if `actual` is not an instance of `Uint8Array`.

```js
assert.isUint8Array(new Uint16Array()); // Fails
assert.isUint8Array(new Uint32Array()); // Fails
assert.isUint8Array(new Uint8Array()); // Passes
```

#### Messages

```js
assert.isUint8Array.message = "Expected ${actual} to be a Uint8Array";
refute.isUint8Array.message = "Expected ${actual} not to be a Uint8Array";
```

### `isUint8ClampedArray()`

```js
assert.isUint8ClampedArray(actual[, message])
```

Fails if `actual` is not an instance of `Uint8ClampedArray`.

```js
assert.isUint8ClampedArray(new Uint8ClampedArray()); // Passes
assert.isUint8ClampedArray(new Uint8Array()); // Fails
```

#### Messages

```js
assert.isUint8ClampedArray.message =
  "Expected ${actual} to be a Uint8ClampedArray";
refute.isUint8ClampedArray.message =
  "Expected ${actual} not to be a Uint8ClampedArray";
```

### `isWeakMap()`

```js
assert.isWeakMap(actual[, message])
```

Fails if `actual` is not an instance of `WeakMap`.

```js
assert.isWeakMap(new WeakMap()); // Passes
assert.isWeakMap(new Map()); // Fails
```

#### Messages

```js
assert.isWeakMap.message = "Expected ${actual} to be a WeakMap";
refute.isWeakMap.message = "Expected ${actual} not to be a WeakMap";
```

### `isWeakSet()`

```js
assert.isWeakSet(actual[, message])
```

Fails if `actual` is not an instance of `WeakSet`.

```js
assert.isWeakSet(new WeakSet()); // Passes
assert.isWeakSet(new Set()); // Fails
```

#### Messages

```js
assert.isWeakSet.message = "Expected ${actual} to be a WeakSet";
refute.isWeakSet.message = "Expected ${actual} not to be a WeakSet";
```

### `keys()`

```js
assert.keys(object, keyArray[, message])
```

Fails if object’s own properties are not exactly the same as a given list.

```js
assert.keys({ test1: "t1", test2: "t2" }, ["test1"]); // Fails - 'test2' is unexpected
assert.keys({ test1: "t1", test2: "t2" }, ["test1", "test2", "test3"]); // Fails - 'test3' is not present
assert.keys({ test1: "t1", test2: "t2" }, ["test1", "test2"]); // Passes
```

#### Messages

```js
assert.keys.message = "Expected ${actualObject} to have exact keys ${keys}";
refute.keys.message = "Expected not to have exact keys ${keys}";
```

### `exception()`

```js
assert.exception(callback[, matcher, message])
```

Fails if `callback` does not throw an exception. If the optional `matcher` is provided, the assertion fails if the callback either does not throw an exception, or if the exception does not meet the criterias of the given `matcher`.

The `matcher` can be of type `object` or `function`. If the `matcher` is of type `object`, the captured error object and the `matcher` are passed to [`match()`](#match).

If the `matcher` is of type `function`, the captured error object is passed as argument to the `matcher` function, which has to return `true` for a matching error object, otherwise `false`.

```js
// Passes
assert.exception(function () {
  throw new Error("Ooops!");
});

// Fails
assert.exception(function () {});

// Passes
assert.exception(
  function () {
    throw new TypeError("Ooops!");
  },
  { name: "TypeError" }
);

// Fails, wrong exception type
assert.exception(
  function () {
    throw new Error("Aww");
  },
  { name: "TypeError" }
);

// Fails, wrong exception message
assert.exception(
  function () {
    throw new Error("Aww");
  },
  { message: "Ooops!" }
);

// Fails, wrong exception type
assert.exception(
  function () {
    throw new Error("Aww");
  },
  function (err) {
    if (err.name !== "TypeError") {
      return false;
    }
    return true;
  },
  "Type of exception is wrong!"
); // with message to print, if test fails
```

### `near()`

```js
assert.near(actual, expected, delta[, message])
```

Fails if the difference between `actual` and `expected` is greater than `delta`.

```js
assert.near(10.3, 10, 0.5); // Passes
assert.near(10.5, 10, 0.5); // Passes
assert.near(10.6, 10, 0.5); // Fails
```

#### Messages

```js
assert.near.message =
  "Expected ${actual} to be equal to ${expected} +/- ${delta}";
refute.near.message =
  "Expected ${actual} not to be equal to ${expected} +/- ${delta}";
```

### `hasArity()`

```js
assert.hasArity(actual, arity[, message])
```

Fails when `actual` does not have the desired arity.

```js
assert.hasArity(function (one) {
  return one;
}, 1); // Passes
assert.hasArity(function (one, two) {
  return one + two;
}, 2); // Passes
assert.hasArity(function (one, two) {
  return one + two;
}, 1); // Fails
```

#### Messages

```js
assert.hasArity.message =
  "Expected ${name} to have arity of ${1} but was ${arity}";
refute.hasArity.message = "Expected ${name} to not have arity of ${1}";
```

### `hasPrototype()`

```js
assert.hasPrototype(actual, prototype[, message])
```

Fails if `prototype` does not exist in the prototype chain of `actual`.

```js
assert.hasPrototype(function () {}, Function.prototype); // Passes
assert.hasPrototype(function () {}, Object.prototype); // Passes
assert.hasPrototype({}, Function.prototype); // Fails
```

#### Messages

```js
assert.hasPrototype.message =
  "Expected ${actual} to have ${expected} on its prototype chain";
refute.hasPrototype.message =
  "Expected ${actual} not to have ${expected} on its prototype chain";
```

### `contains()`

```js
assert.contains(haystack, needle[, message])
```

Fails if the array like object `haystack` does not contain the `needle` argument.

```js
assert.contains([1, 2, 3], 2); // Passes
assert.contains([1, 2, 3], 4); // Fails
assert.contains([1, 2, 3], "2"); // Fails
```

#### Messages

```js
assert.contains.message = "Expected [${actual}] to contain ${expected}";
refute.contains.message = "Expected [${actual}] not to contain ${expected}";
```

### `tagName()`

```js
assert.tagName(element, tagName[, message])
```

Fails if the `element` either does not specify a `tagName` property, or if its value is not a case-insensitive match with the expected `tagName`. Works with any object.

```js
assert.tagName(document.createElement("p"), "p"); // Passes
assert.tagName(document.createElement("h2"), "H2"); // Passes
assert.tagName(document.createElement("p"), "li"); // Fails
```

### `className()`

```js
assert.className(element, classNames[, message])
```

Fails if the `element` either does not specify a `className` property, or if its value is not a space-separated list of all class names in `classNames`.

`classNames` can be either a space-delimited string or an array of class names. Every class specified by classNames must be found in the object’s `className` property for the assertion to pass, but order does not matter.

```js
var el = document.createElement("p");
el.className = "feed item blog-post";

assert.className(el, "item"); // Passes
assert.className(el, "news"); // Fails
assert.className(el, "blog-post feed"); // Passes
assert.className(el, "feed items"); // Fails, "items" is not a match
assert.className(el, ["item", "feed"]); // Passes
```

### `resolves()`

```js
assert.resolves(promise[, value])
```

**NOTE:** This assertion returns a
[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)!

The assertion **resolves**, if the value resolved from `promise`
[`equals`](#equals) the given `value`.

Furthermore, the assertion **rejects** if,

- the resolved value from the input `promise` is not equal to the given `value`
- the given `promise` rejects instead of resolving
- the given input is not a Promise

**NOTE:** In order to tell the test runner to wait until the assertion has completed, you
either need to return the Promise from the assertion:

```js
test("some asynchronous code", function() {
    return assert.resolves(myAsyncFunc(), {...});
});
```

or use `async`/`await`:

```js
test("some asynchronous code", async function() {
    await assert.resolves(myAsyncFunc(), {...});
});
```

### `rejects()`

```js
assert.rejects(promise[, value])
```

**NOTE:** This assertion returns a
[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)!

The assertion **resolves**, if the value rejected from `promise`
[`equals`](#equals) the given `value`.

Furthermore, the assertion **rejects** if,

- the rejected value from the input `promise` is not equal to the given `value`
- the given `promise` resolves instead of rejecting
- the given input is not a Promise

**NOTE:** In order to tell the test runner to wait until the assertion has completed, you
either need to return the Promise from the assertion:

```js
test("some asynchronous code", function() {
    return assert.rejects(myAsyncFunc(), {...});
});
```

or use `async`/`await`:

```js
test("some asynchronous code", async function() {
    await assert.rejects(myAsyncFunc(), {...});
});
```

### `json()`

```js
assert.json(actual, json[, message])
```

Fails if `actual` is not valid JSON or the parsed JSON is not equal to `json`. Uses the same comparison algorithm as [`equals()`](#equals).

```js
var serialized = JSON.stringify({ is: 42 });

assert.json(serialized, { is: 42 }); // Passes
assert.json(serialized, { or: 42 }); // Fails
assert.json(serialized, { is: 7 }); // Fails
assert.json("no-json", {}); // Fails
```

### `matchJson()`

```js
assert.matchJson(actual, json[, message])
```

Fails if `actual` is not valid JSON or the parsed JSON does not match `json`. Uses the same matcher algorithm as [`match()`](#match).

```js
var serialized = JSON.stringify({ is: 42, and: 3 });

assert.matchJson(serialized, { is: 42 }); // Passes
assert.matchJson(serialized, { and: 3 }); // Passes
assert.matchJson(serialized, { or: 42 }); // Fails
assert.matchJson(serialized, { is: 7 }); // Fails
assert.matchJson("no-json", {}); // Fails
```

## Custom assertions

Custom, domain-specific assertions help improve clarity and reveal intent in tests. They also facilitate much better feedback when they fail. You can add custom assertions that behave exactly like the built-in ones (i.e. with counting, message formatting, expectations and
more) by using the [`referee.add`](#refereeadd) method.

### Load custom assertions

Custom assertions can be loaded as modules using e.g. [mocha](https://mochajs.org/) to be used in tests.

#### Custom assertion

`./test/assertions/is-prime.js`

```js
const referee = require("referee");

// adapted from https://stackoverflow.com/a/40200710
function isPrime(number) {
  for (var i = 2; i < number; i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return number !== 1 && number !== 0;
}

referee.add("isPrime", {
  assert: function assert(actual) {
    if (typeof actual !== "number" || actual < 0) {
      throw new TypeError("'actual' argument should be a non-negative Number");
    }

    this.actual = actual;

    return isPrime(actual);
  },
  assertMessage: "Expected ${actual} to be a prime number",
  refuteMessage: "Expected ${actual} to not be a prime number",
  expectation: "toHaveArity",
});
```

#### Test

`./test/some.test.js`

```js
const { assert, refute } = require("referee");

describe("some", function () {
  it("should have isPrime installed", function () {
    assert.isPrime(5);
    refute.isPrime(6);
  });
});
```

#### Execute

```sh
mocha -r ./test/assetions/*
```

[This repository](https://github.com/sinonjs/referee-custom-assertions) hosts the full runnable example from above, as well as demos using other popular test runners.

## Overriding assertion messages

The default assertion messages can be overridden. The messages to
overwrite are listed with each assertion. You can use the same keys for
string interpolation (e.g. `${actual}`, `${expected}`). equals:

```js
var assert = require("referee").assert;
assert.equals.message = "I wanted ${actual} == ${expected}!";

try {
  assert.equals(3, 4);
} catch (e) {
  console.log(e.message);
}

// Prints:
// "I wanted 3 == 4!"
```

## Events

**referee** is an event-emitter. Listen to events with `on`:

```js
referee.on("failure", function (err) {
  console.log(err.message);
});
```

### `pass` event

Signature:

```js
"pass", function () {};
```

Assertion passed. The callback is invoked with the assertion name, e.g.
`"equals"`, as its only argument. Note that this event is also emitted
when refutations pass.

### `failure` event

Signature:

```js
"failure", function (error) {};
```

Assertion failed. The callback is invoked with an [`AssertionError`](#class-assertionerror) object.

## Expectations

All of **referee**'s assertions and refutations are also exposed as "expectations". Expectations is just a slightly different front-end to the same functionality, often preferred by the BDD inclined.

Expectations mirror assertions under different names. Refutations can be expressed using `expect(obj).not` and then calling either of the expectations on the resulting object.

```js
var expect = require("referee").expect;

expect({ id: 42 }).toBeObject(); // Passes
expect("Somewhere in here").toMatch("in"); // Passes
expect(42).not.toEqual(43); // Passes
```

### `expect.toBe()`

```js
expect(actual).toBe(expected);
```

See [`same()`](#same)

### `expect.toEqual()`

```js
expect(actual).toEqual(expected);
```

See [`equals()`](#equals)

### `expect.toBeGreaterThan()`

```js
expect(actual).toBeGreaterThan(expected);
```

See [`greater()`](#greater)

### `expect.toBeLessThan()`

```js
expect(actual).toBeLessThan(expected);
```

See [`less()`](#less)

### `expect.toBeDefined()`

```js
expect(actual).toBeDefined(expected);
```

See [`defined()`](#defined)

### `expect.toBeNull()`

```js
expect(actual).toBeNull(expected);
```

See [`isNull()`](#isnull)

### `expect.toMatch()`

```js
expect(actual).toMatch(expected);
```

See [`match()`](#match)

### `expect.toBeObject()`

```js
expect(actual).toBeObject(expected);
```

See [`isObject()`](#isobject)

### `expect.toBeFunction()`

```js
expect(actual).toBeFunction(expected);
```

See [`isFunction()`](#isfunction)

### `expect.toBeTrue()`

```js
expect(actual).toBeTrue();
```

See [`isTrue()`](#istrue)

### `expect.toBeFalse()`

```js
expect(actual).toBeFalse();
```

See [`isFalse()`](#isfalse)

### `expect.toBeString()`

```js
expect(actual).toBeString();
```

See [`isString()`](#isstring)

### `expect.toBeBoolean()`

```js
expect(actual).toBeBoolean();
```

See [`isBoolean()`](#isboolean)

### `expect.toBeNumber()`

```js
expect(actual).toBeNumber();
```

See [`isNumber()`](#isnumber)

### `expect.toBeNaN()`

```js
expect(actual).toBeNaN();
```

See [`isNaN()`](#isnan)

### `expect.toBeArray()`

```js
expect(actual).toBeArray();
```

See [`isArray()`](#isarray)

### `expect.toBeArrayLike()`

```js
expect(actual).toBeArrayLike();
```

See [`isArrayLike()`](#isarraylike)

### `expect.toHaveKeys()`

```js
expect(object).toHaveKeys(keyArray);
```

See [`keys()`](#keys)

### `expect.toThrow()`

```js
expect(actual).toThrow(expected);
```

See [`exception()`](#exception)

### `expect.toBeNear()`

```js
expect(actual).toBeNear(expected, delta);
```

See [`near()`](#near)

### `expect.toHavePrototype()`

```js
expect(actual).toHavePrototype(prototype);
```

See [`hasPrototype()`](#hasprototype)

### `expect.toContain()`

```js
expect(haystack).toContain(needle);
```

See [`contains()`](#contains)

### `expect.toHaveTagName()`

```js
expect(actual).toHaveTagName(expected);
```

See [`tagName()`](#tagname)

### `expect.toHaveClassName()`

```js
expect(actual).toHaveClassName(expected);
```

See [`className()`](#classname)

### `expect.toEqualJson()`

```js
expect(actual).toEqualJson(expected);
```

See [`json()`](#json)

### `expect.toMatchJson()`

```js
expect(actual).toMatchJson(expected);
```

See [`matchJson()`](#matchJson)

### `expect.toHaveBeenCalled()`

```js
expect(spy).toHaveBeenCalled();
```

See [`called()`](#called)

### `expect.toHaveBeenCalledOnce()`

```js
expect(spy).toHaveBeenCalledOnce(expected);
```

See [`calledOnce()`](calledonce)

### `expect.toHaveBeenCalledTwice()`

```
expect(spy).toHaveBeenCalledTwice(expected)
```

See [`calledTwice()`](#calledtwice)

### `expect.toHaveBeenCalledThrice()`

```js
expect(spy).toHaveBeenCalledThrice(expected);
```

See [`calledThrice()`](#calledthrice)

### `expect.toHaveBeenCalledWith()`

```js
expect(spy).toHaveBeenCalledWith(arg1, arg2, ...)
```

See [`calledWith()`](#calledwith)

### `expect.toHaveBeenCalledOnceWith()`

```js
expect(spy).toHaveBeenCalledOnceWith(arg1, arg2, ...)
```

See [`calledOnceWith()`](#calledoncewith)

## Methods

### `referee.fail()`

```js
referee.fail(message);
```

When an assertion fails, it calls `referee.fail()` with the failure message as the only argument. The built-in `fail` function both throws an [`AssertionError()`](#class-assertionerror) and emits it to the `failure` event. The error can be caught and handled by the test runner. If this behavior is not suitable for your testing framework of choice, you can override `referee.fail()` to make it do the right thing.

Example: To use **referee** with JsTestDriver, you can simply configure it as follows:

```js
referee.fail = function (message) {
  fail(message);
};
```

Where the global `fail` function is the one provided by JsTestDriver.

It is possible to make the default `assert.fail` method only emit an event and not throw an error. This may be suitable in asynchronous test runners, where you might not be able to catch exceptions. To silence exceptions, see the `throwOnFailure` property.

### `referee.add()`

```js
referee.add(name, options);
```

Add a custom assertion. Using this ‘macro’ to add project specific assertions has a few advantages:

- Assertions will be counted
- Failure messages will have interpolated arguments formatted
- A single function generates both an assertion and a refutation
- If using expectations, an expectation can easily be generated as well
- When `failOnNoAssertions` is set to `true`, the assertion will behave correctly (may be important for asynchronous tests)
- The assertion will fail if too few arguments are passed

Here’s an example of adding a “foo” assertion, that only passes when its only argument is the string “foo”:

```js
var assert = referee.assert;
var refute = referee.refute;
var expect = referee.expect;

referee.add("isFoo", {
  assert: function (actual) {
    return actual == "foo";
  },
  assertMessage: "Expected ${0} to be foo!",
  refuteMessage: "Expected not to be foo!",
  expectation: "toBeFoo",
});

// Now you can do:
// Passes
assert.isFoo("foo");

// Fails: "[assert.isFoo] Expected { id: 42 } to be foo!"
assert.isFoo({ id: 42 });

// Fails: "[refute.isFoo] Expected not to be foo!"
refute.isFoo("foo");

// Passes
expect("foo").toBeFoo();

// To support custom messages, do this:
referee.add("isFoo", {
  assert: function (actual) {
    return actual == "foo";
  },
  assertMessage: "${1}Expected ${0} to be foo!",
  refuteMessage: "${1}Expected not to be foo!",
  expectation: "toBeFoo",
  values: function (thing, message) {
    return [thing, message ? message + " " : ""];
  },
});

// Fails: "[assert.isFoo] Ouch: Expected { id: 42 } to be foo!"
assert.isFoo({ id: 42 }, "Ouch");
```

#### Error message value interpolation

Arguments are available in assertion failure messages using the `"${n}"` switches, where `n` is a number. You can also use named variables by setting properties on `this` in the assertion/refutation function:

```js
referee.add("isString", {
  assert: function (actual) {
    this.actualType = typeof actual;
    return this.actualType == "string";
  },
  assertMessage: "Expected ${0} (${actualType}) to be string",
  refuteMessage: "Expected not to be string",
  expectation: "toBeString",
});
```

##### Arguments

<dl>
    <dt>name</dt>
    <dd>The name of the new assertion/refutation</dd>
    <dt>options</dt>
    <dd>
        <dl>
            <dt><code>assert</code></dt>
            <dd>
The verification function. Should return <code>true</code> when the assertion passes. The generated refutation will pass when the function returns <code>false</code>.

In some cases the refutation may not be the exact opposite of the assertion. If that is the case you should provide <code>options.refute</code> for the custom refutation.

The number of formal parameters the function accepts determines the number of required arguments to the function. If the assertion is called with less arguments than expected, <strong>referee</strong> will fail it before your custom function is even called.

All arguments are available for interpolation into the resulting error message. The first argument will be available as <code>"${0}"</code>, the second as <code>"${1}"</code> and so on. If you want to embed other values than exact arguments into the string, you can set properties on this in the custom assertion, and refer to them as <code>"${name}"</code> in the message.
            </dd>
            <dt><code>refute</code></dt>
            <dd>Custom refutation function. Used over <code>!assert()</code> if provided.</dd>
            <dt><code>assertMessage</code></dt>
            <dd>The error message to use when the assertion fails. The message may refer to arguments through switches like <code>"${0}"</code> and so on (see above, under the assert argument). The message is exposed on the generated assertion as the property <code>assert.[name].message</code>.</dd>

<dt><code>refuteMessage</code></dt>
<dd>Like <code>assertMessage</code>, but for refutations. Exposed as <code>refute.[name].message</code>.</dd>
<dt><code>values</code></dt>
<dd>A function that maps values to be interpolated into the failure messages. This can be used when you need something more/else than the actual <code>arguments</code> in order.</dd>
<dt><code>expectation</code></dt>
<dd>The name of the assertion as an expectation, e.g. “toBeSomething”. Optional.</dd>
</dl>
</dd>

</dl>

### `referee.verifier()`

Creates a verifier function with the signature `verify([expected])`.

It exposes `verify.count` which is incremented every time `referee` emits a `"pass"` or a `"failure"` event. When called, the function verifies that assertions have been made, throwing an exception if `verify.count` is zero. When `expected` is passed, then this is compared with `verify.count`.

`verify()` always unsubscribes the event listeners, so that `verify.count` does not change. This means you have to create a new verifier for each test run.

```js
it("should do something", function () {
  var verify = referee.verifier();

  var limit = 10;
  for (var i = 0; i < 10; i++) {
    console.log(i);
  }

  // this test will fail as no assertions have been made
  verify();
});

it("should do something", function () {
  var verify = referee.verifier();

  var limit = 10;
  for (var i = 0; i < 10; i++) {
    assert.isTrue(true);
  }

  // this will pass because exactly 10 (`limit`) assertions have been made
  verify(limit);

  console.log(verify.count);
  // 10
});
```

## Properties

### `referee.throwOnFailure`

`Boolean`.

When using the default `referee.fail()` implementation, this property can be set to `false` to make assertion failures not throw exceptions (i.e. only emit events). This may be suitable in asynchronous test runners, where you might not be able to catch exceptions.

## Supporting objects

### `class AssertionError()`

An exception (specifically, an `Error` object) whose `name` property is `"AssertionError"`.
