=======
Referee
=======

    Referee is in your unit tests, deciding who passes and who fails

.. raw:: html

    <a href="http://travis-ci.org/busterjs/referee" class="travis">
      <img src="https://secure.travis-ci.org/busterjs/referee.png">
    </a>

``referee`` is a test-framework agnostic assertion and expectation library.
Some highlights:

- Rich library of assertions
- Symmetric assert/refute (refute is ``referee``'s "assert.not*")
- Evented: Emits success and failure events
- Failing assertions throw exceptions by default, but can be configured to not
- API to add custom assertions that provides quite a bit of plumbing for free

Full documentation:
`docs.busterjs.org/en/latest/modules/buster-assertions <http://docs.busterjs.org/en/latest/modules/buster-assertions/>`_.

``referee`` works in browsers (including old and rowdy ones, like IE6) and Node.
It will define itself as an AMD module if you want it to (i.e. if there's a
``define`` function available).

Developers - Running tests
==========================

::

    npm install
    ./node_modules/.bin/buster-test --node
    ./node_modules/.bin/buster-server
    ./node_modules/.bin/buster-test --browser

Assertions
==========

- ``assert(actual[, message])``
- ``assert.same(actual, expected[, message])``
- ``assert.equals(actual, expected[, message])``
- ``assert.greater(number, target[, message])``
- ``assert.less(number, target[, message])``
- ``assert.defined(actual[, message])``
- ``assert.isNull(actual[, message])``
- ``assert.match(obj1, obj2[, message])``
- ``assert.isObject(actual[, message])``
- ``assert.isFunction(actual[, message])``
- ``assert.isTrue(actual[, message])``
- ``assert.isFalse(actual[, message])``
- ``assert.isString(actual[, message])``
- ``assert.isBoolean(actual[, message])``
- ``assert.isNumber(actual[, message])``
- ``assert.isNaN(actual[, message])``
- ``assert.isArray(actual[, message])``
- ``assert.isArrayLike(actual[, message])``
- ``assert.exception(fn[, matcher][, message])``
- ``assert.near(actual, expected, delta[, message])``
- ``assert.hasPrototype(actual, expected[, message])``
- ``assert.contains(haystack, needle[, message])``
- ``assert.tagName(element, tagName[, message])``
- ``assert.className(element, className[, message])``

Refutations
===========

- ``refute(actual[, message])``
- ``refute.same(actual, expected[, message])``
- ``refute.equals(actual, expected[, message])``
- ``refute.greater(number, target[, message])``
- ``refute.less(number, target[, message])``
- ``refute.defined(actual[, message])``
- ``refute.isNull(actual[, message])``
- ``refute.match(obj1, obj2[, message])``
- ``refute.isObject(actual[, message])``
- ``refute.isFunction(actual[, message])``
- ``refute.isTrue(actual[, message])``
- ``refute.isFalse(actual[, message])``
- ``refute.isString(actual[, message])``
- ``refute.isBoolean(actual[, message])``
- ``refute.isNumber(actual[, message])``
- ``refute.isNaN(actual[, message])``
- ``refute.isArray(actual[, message])``
- ``refute.isArrayLike(actual[, message])``
- ``refute.exception(fn[, matcher][, message])``
- ``refute.near(actual, expected, delta[, message])``
- ``refute.hasPrototype(actual, expected[, message])``
- ``refute.contains(haystack, needle[, message])``
- ``refute.tagName(element, tagName[, message])``
- ``refute.className(element, className[, message])``
