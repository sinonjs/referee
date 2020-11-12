# Assertions

This folder contains all the built-in assertions

## Testing assertions

There is a test helper for making testing the assertions easier.

### `testHelper.assertionTests`

Takes three arguments

<dl>
    <dt>`type`</dt>
    <dd>can be either `"assert"` or `"refute"`</dd>

    <dt>`assertion`</dt>
    <dd>the name of the assertion to test</dd>

    <dt>`callback`</dt>
    <dd>the function that implements tests for the assertion</dd>

</dl>

The `callback` will be called with four arguments:

- `pass`
- `fail`
- `msg`
- `error`

#### `pass`

`pass` is used for testing examples that the assertion should pass for.

It is a variadic function, which expects at least two arguments.

The first argument `name` is used for creating the _expectation_ for mocha's `it` function.

The remaining arguments are passed to the assertion.

```js
"use strict";

testHelper.assertionTests("assert", "isTrue", function (
  pass,
  fail,
  msg,
  error
) {
  pass(
    // name, used to create name for `it`
    "for true",
    // passed to assert.isTrue
    true
  );
});
```

#### `fail`

`fail` is used for testing examples that the assertion should fail for.

It is a variadic function, which expects at least two arguments.

The first argument `name` is used for creating the _expectation_ for mocha's `it` function.

The remaining arguments are passed to the assertion.

```js
"use strict";

testHelper.assertionTests("assert", "isTrue", function (
  pass,
  fail,
  msg,
  error
) {
  fail(
    // name, used to create name for `it`
    "for false",
    // passed to assert.isTrue
    false
  );
});
```

#### `msg`

`msg` is used for testing the message that comes out of the assertion when it fails.

It is a variadic function, which expects at least three arguments.

The first two arguments are `name` and `message`. `name` is used for the output when running the test that verifies the assertion. `message` is the expected message from the assertion.

The remaining arguments are passed to the assertion.

```js
"use strict";

testHelper.assertionTests("assert", "isTrue", function (
  pass,
  fail,
  msg,
  error
) {
  msg(
    // name
    "represent expected value in message",
    // message
    "[assert.isTrue] Expected {  } to be true",
    // passed to assert.isTrue
    {}
  );
});
```

#### `error`

`error` is used for examining the properties of the `Error` objects thrown by the assertion when it fails.

It is a variadic function that expects at least three arguments.
The first two arguments are `name` and `properties`. `name` is used for the output when running the test that verifies the assertion. `properties` lists the properties and values that are expected on the `Error` instance thrown by the assertion.

The remaining arguments are passed to the assertion.

```js
"use strict";

testHelper.assertionTests("assert", "isTrue", function (
  pass,
  fail,
  msg,
  error
) {
  error(
    // `name`
    "for false",
    // `properties`
    {
      code: "ERR_ASSERTION",
      operator: "assert.isTrue",
    },
    // passed to assert.isTrue
    false
  );
});
```
