=======
Referee
=======

    Referee is in you unit tests, deciding who passes and who fails

[![Build status](https://secure.travis-ci.org/busterjs/referee.png?branch=master)](http://travis-ci.org/busterjs/referee)

``referee`` is a test-framework agnostic assertion and expectation library.
Some highlights:

- Rich library of assertions
- Symmetric assert/refute (refute is ``referee``'s "assert.not*")
- Evented: Emits success and failure events
- Failing assertions throw exceptions by default, but can be configured to not
- API to add custom assertions that provides quite a bit of plumbing for free

Developers - Running tests
==========================

::

    npm install
    ./node_modules/.bin/buster-test --node
    ./node_modules/.bin/buster-server
    ./node_modules/.bin/buster-test --browser
