# referee

[![codecov](https://codecov.io/gh/sinonjs/referee/branch/main/graph/badge.svg)](https://codecov.io/gh/sinonjs/referee)
<a href="CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg" alt="Contributor Covenant" /></a>

**referee** is in your unit tests, deciding who passes and who fails.

It is a test-framework agnostic assertion and expectation library, designed to work with your choice of test runner.
Some highlights:

- Rich library of assertions
- Supports custom assertions
- Symmetric assert/refute (refute is **referee**'s "assert.not\*")
- Evented: Emits success and failure events
- Failing assertions throw exceptions by default, but can be configured to not
- API to add custom assertions that provides quite a bit of plumbing for free
- 100% test coverage (enforced with `test-check-coverage` in `package.json`)

**referee** works in browsers (including old and rowdy ones, like IE11) and Node ([LTS versions](https://github.com/nodejs/Release#release-schedule)).
It will define itself as an AMD module if you want it to (i.e. if there's a
`define` function available).

## Documentation

https://sinonjs.github.io/referee/

## Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/sinon#backer)]

<a href="https://opencollective.com/sinon/backer/0/website" target="_blank"><img src="https://opencollective.com/sinon/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/1/website" target="_blank"><img src="https://opencollective.com/sinon/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/2/website" target="_blank"><img src="https://opencollective.com/sinon/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/3/website" target="_blank"><img src="https://opencollective.com/sinon/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/4/website" target="_blank"><img src="https://opencollective.com/sinon/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/5/website" target="_blank"><img src="https://opencollective.com/sinon/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/6/website" target="_blank"><img src="https://opencollective.com/sinon/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/7/website" target="_blank"><img src="https://opencollective.com/sinon/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/8/website" target="_blank"><img src="https://opencollective.com/sinon/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/9/website" target="_blank"><img src="https://opencollective.com/sinon/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/10/website" target="_blank"><img src="https://opencollective.com/sinon/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/11/website" target="_blank"><img src="https://opencollective.com/sinon/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/12/website" target="_blank"><img src="https://opencollective.com/sinon/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/13/website" target="_blank"><img src="https://opencollective.com/sinon/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/14/website" target="_blank"><img src="https://opencollective.com/sinon/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/15/website" target="_blank"><img src="https://opencollective.com/sinon/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/16/website" target="_blank"><img src="https://opencollective.com/sinon/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/17/website" target="_blank"><img src="https://opencollective.com/sinon/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/18/website" target="_blank"><img src="https://opencollective.com/sinon/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/19/website" target="_blank"><img src="https://opencollective.com/sinon/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/20/website" target="_blank"><img src="https://opencollective.com/sinon/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/21/website" target="_blank"><img src="https://opencollective.com/sinon/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/22/website" target="_blank"><img src="https://opencollective.com/sinon/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/23/website" target="_blank"><img src="https://opencollective.com/sinon/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/24/website" target="_blank"><img src="https://opencollective.com/sinon/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/25/website" target="_blank"><img src="https://opencollective.com/sinon/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/26/website" target="_blank"><img src="https://opencollective.com/sinon/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/27/website" target="_blank"><img src="https://opencollective.com/sinon/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/28/website" target="_blank"><img src="https://opencollective.com/sinon/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/sinon/backer/29/website" target="_blank"><img src="https://opencollective.com/sinon/backer/29/avatar.svg"></a>

## Sponsors

Become a sponsor and get your logo on our README on GitHub with a link to your site. [[Become a sponsor](https://opencollective.com/sinon#sponsor)]

<a href="https://opencollective.com/sinon/sponsor/0/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/1/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/2/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/3/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/4/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/5/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/6/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/7/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/8/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/9/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/10/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/10/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/11/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/11/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/12/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/12/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/13/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/13/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/14/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/14/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/15/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/15/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/16/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/16/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/17/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/17/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/18/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/18/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/19/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/19/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/20/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/20/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/21/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/21/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/22/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/22/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/23/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/23/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/24/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/24/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/25/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/25/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/26/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/26/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/27/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/27/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/28/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/28/avatar.svg"></a>
<a href="https://opencollective.com/sinon/sponsor/29/website" target="_blank"><img src="https://opencollective.com/sinon/sponsor/29/avatar.svg"></a>

## Licence

referee was released under [BSD-3](LICENSE)
