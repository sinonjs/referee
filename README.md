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


## Changelog

**1.2.0** (2015-Nov-16)

* Updated dependencies [#13](https://github.com/busterjs/referee/pull/13)
* Added license info in package.json [#12](https://github.com/busterjs/referee/pull/12)
* A `test` method on assertions, returning a promise which is resolved, when assertion passes, and rejected when it fails; relies on a `Promise` global (shimmable) [#9](https://github.com/busterjs/referee/pull/9) 

**1.1.1** (2014-Dec-12)

* part of fix for issue [#274 - quoting in assertion failures](https://github.com/busterjs/buster/issues/274)

**1.1.0** (2014-Oct-31)

* fix for issue [#402 - referee.expect fails if path.resolve gets stubbed](https://github.com/busterjs/buster/issues/402)

**1.0.3** (2014-Apr-30)

* fix for issue [#387 - Referee: assert.exception does not check exception type (when given as string)](https://github.com/busterjs/buster/issues/387)


## Developers - Running tests

### Node

  1. `npm install` - installs dev dependencies
  1. `npm test` - runs node tests

### Browsers

  1. `npm install` - installs dev dependencies
  1. `npm start` - starts buster server
  1. open url [localhost:1111/capture](http://localhost:1111/capture) in the browser(s) you want to test with
  1. `npm run-script test-browser` - runs browser tests
