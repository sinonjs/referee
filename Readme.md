# referee

[![Build status](https://secure.travis-ci.org/busterjs/referee.png?branch=master)](http://travis-ci.org/busterjs/referee)

**referee** is in your unit tests, deciding who passes and who fails.

It is a test-framework agnostic assertion and expectation library.
Some highlights:

- Rich library of assertions
- Symmetric assert/refute (refute is **referee**'s "assert.not*")
- Evented: Emits success and failure events
- Failing assertions throw exceptions by default, but can be configured to not
- API to add custom assertions that provides quite a bit of plumbing for free

Full documentation:
[docs.busterjs.org/en/latest/modules/referee](http://docs.busterjs.org/en/latest/modules/referee/).

**referee** works in browsers (including old and rowdy ones, like IE6) and Node.
It will define itself as an AMD module if you want it to (i.e. if there's a
`define` function available).

## Developers - Running tests

    npm install
    ./node_modules/.bin/buster-test --node
    ./node_modules/.bin/buster-server
    ./node_modules/.bin/buster-test --browser
