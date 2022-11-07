# Changes

## 9.1.2

- [`003d1a0`](https://github.com/sinonjs/referee/commit/003d1a0781142bf6790af8ef6d2b1305fd190f24)
  Prefer @sinonjs/commons@2 (Morgan Roderick)
    >
    > That makes ES2017 support explicit
    >

_Released by Morgan Roderick on 2022-11-07._

## 9.1.1

- [`3666289`](https://github.com/sinonjs/referee/commit/36662898c2f149e4485e45455188dade36262bde)
  Fix pending promise in async assertion on error (Maximilian Antoni)
    >
    > Fail the test with the thrown error message by rejecting the internal
    > assertion promise. Without handling the exception, the assertion promise
    > wouldn't be resolved or rejected and a test case awaiting the promise
    > would hang.
    >

_Released by Morgan Roderick on 2021-08-05._

## 9.1.0

- [`910e80c`](https://github.com/sinonjs/referee/commit/910e80c85b88cf8fc0e5a6fd53262c11d7b125bc)
  Allow functions for assert and refute messages (Morgan Roderick)
    >
    > This allows for dynamic assert and refute messages, which is required to
    > improve combined assertions like `calledOnceWith` in
    > `@sinonjs/refere-sinon`.
    >
- [`f9d0c82`](https://github.com/sinonjs/referee/commit/f9d0c82c2c4eef6951922fd453f9ed6f7bdc242a)
  Fix tests in node 12.14.1 (Morgan Roderick)
    >
    > Some tests were failing in node 12.14.1, because of changes (likely
    > improvements) to object formatting. By using `util.inspect` in tests, we
    > can match the strings correctly, no matter the node version.
    >

_Released by Morgan Roderick on 2021-07-26._

## 9.0.1

- [`d5e06d5`](https://github.com/sinonjs/referee/commit/d5e06d53b08267e023bffb26f118e20d165d7a76)
  Add support for Node 16 (Morgan Roderick)
    >
    > * Run tests in Node 16
    >
- [`c0a9a6b`](https://github.com/sinonjs/referee/commit/c0a9a6bdc29d173117e16a145f793839ef3a50d7)
  Fix Node 16 (Morgan Roderick)
    >
    > The object formatting changed (improved) slightly between Node 14 and 16, which
    > broke some of the tests.
    >
    > Since https://github.com/sinonjs/referee/pull/183, we're supposed to be using a
    > frozen version of `util` for formatting values for error messages. Looks like we
    > missed a few places.
    >

_Released by Morgan Roderick on 2021-06-15._

## 9.0.0

- [`cd4d34a`](https://github.com/sinonjs/referee/commit/cd4d34aa30b6af1be0775a849096ae398a73770a)
  npm audit (Maximilian Antoni)
- [`136f4a5`](https://github.com/sinonjs/referee/commit/136f4a51bde80a5a62c5887894995df80be38999)
  Upgrade @sinonjs/samsam and sinon (Maximilian Antoni)
- [`95d9bec`](https://github.com/sinonjs/referee/commit/95d9bec608d2b3ea90275109c0124ae39cf555ca)
  Update @studio/changes (Maximilian Antoni)
- [`ac6ea7a`](https://github.com/sinonjs/referee/commit/ac6ea7adb0278d857e6b8fdbb6f7529c9a64a204)
  Update @sinonjs/eslint-config (Maximilian Antoni)
- [`affa3dc`](https://github.com/sinonjs/referee/commit/affa3dc5d57af3733268141ec51517bd1a01bc98)
  Update @sinonjs/commons (Maximilian Antoni)
- [`71ce2d5`](https://github.com/sinonjs/referee/commit/71ce2d5a3c1fefc9312f11131bffee6bc9148438)
  Use npm 7 (Maximilian Antoni)
- [`5450458`](https://github.com/sinonjs/referee/commit/5450458cb8c4ff42002a36e622cb5825fba79502)
  Bump glob-parent from 5.1.1 to 5.1.2 (dependabot[bot])
- [`85d4143`](https://github.com/sinonjs/referee/commit/85d41432e06ed5041bc4ac486ec4ab7c2f11c0b5)
  Bump browserslist from 4.16.3 to 4.16.6 (dependabot[bot])
- [`564ec3b`](https://github.com/sinonjs/referee/commit/564ec3b11deeda6320aa9885161f1da6c2bc7598)
  Fix typo in isUndefined docs (Serkan Özel)
- [`cfa8bcd`](https://github.com/sinonjs/referee/commit/cfa8bcd33c96057ce96f5aeab9003905ebffe7d0)
  Bump hosted-git-info from 3.0.5 to 3.0.8 (dependabot[bot])
- [`17c84ba`](https://github.com/sinonjs/referee/commit/17c84bab005184c68c5f7ffd45ca9c3b36d7d98c)
  Bump lodash from 4.17.20 to 4.17.21 (dependabot[bot])

_Released by [Maximilian Antoni](https://github.com/mantoni) on 2021-06-08._

## 8.0.2

- [`f695dca`](https://github.com/sinonjs/referee/commit/f695dcac7ebaae942d2ef574688cc044e11771b7)
  Fix resolves and rejects arity (Maximilian Antoni)

_Released on 2021-04-27._

## 8.0.1

- [`06aeae4`](https://github.com/sinonjs/referee/commit/06aeae4d7cd45899dd44093704fd71bd9cbba5f9)
  Bump y18n from 4.0.0 to 4.0.1 (dependabot[bot])
    >
    > Bumps [y18n](https://github.com/yargs/y18n) from 4.0.0 to 4.0.1.
    > - [Release notes](https://github.com/yargs/y18n/releases)
    > - [Changelog](https://github.com/yargs/y18n/blob/master/CHANGELOG.md)
    > - [Commits](https://github.com/yargs/y18n/commits)
    >
    > Signed-off-by: dependabot[bot] <support@github.com>

_Released on 2021-04-08._

## 8.0.0

- [`84afaf0`](https://github.com/sinonjs/referee/commit/84afaf0e0f5ddf505f0dd03593354bf26a580dee)
  Upgrade linting config (Morgan Roderick)
    > This drops support for IE11, legacy Edge and older Safari (pre 10)
    >
    > Replace `eslint-config-sinon` with the new version under a new name
    > `@sinonjs/eslint-config`. The new package includes the correct versions
    > of all the dependencies to have a working `eslint` setup in downstream
    > projects.
    >
    > See https://github.com/sinonjs/eslint-config/pull/7
    >

_Released on 2021-03-12._

## 7.0.0

- [`2a678f0`](https://github.com/sinonjs/referee/commit/2a678f0ebcaeb0a1ea42f433287545fbe014a16e)
  Upgrade prettier to 2.x (Morgan Roderick)
    >
    > * upgrade `eslint-config-prettier`
    > * upgrade `eslint-plugin-prettier`
    > * run `prettier` on all JavaScript files
    >     ```sh
    >     $(npm bin)/prettier -w -u .`
    >     ```
    >

_Released on 2020-11-16._

## 6.2.1

- [`f5aaf56`](https://github.com/sinonjs/referee/commit/f5aaf569d6c310a470b59425ce999797161f1b27)
  Add package util to improve platform independence (Morgan Roderick)
- [`36ce1fa`](https://github.com/sinonjs/referee/commit/36ce1fa8b85773b1fc2c34b9ff7c75ee554b165e)
  Use event-emitter instead of node builtin 'events' module (Morgan Roderick)
    >
    > This brings us closer to browser compatibility
    >

_Released on 2020-11-11._

## 6.2.0

- [`0e9ab9b`](https://github.com/sinonjs/referee/commit/0e9ab9b4b5663ea22dc01c5de0fa385a118ee2c8)
  Adjust documentation for resolves and rejects (Maximilian Antoni)
- [`fe4616e`](https://github.com/sinonjs/referee/commit/fe4616e8961efa2c0af1d07a27dba9a6036caff7)
  Support resolves and rejects without expectation (Maximilian Antoni)
- [`4b21019`](https://github.com/sinonjs/referee/commit/4b210199fadfbb95c283fac131bb67c2e2e8edf6)
  Use deepEqual to compare rejected promise value (Maximilian Antoni)
- [`b001fed`](https://github.com/sinonjs/referee/commit/b001fed44fdb5e8d454c90d40e98848f4eb4739b)
  Use deepEqual to compare resolved promise value (Maximilian Antoni)

_Released by [Maximilian Antoni](https://github.com/mantoni) on 2020-11-07._

## 6.1.0

- [`9ea1198`](https://github.com/sinonjs/referee/commit/9ea1198cdf0a796a1c346d40be44e259af967725)
  Allow to skip formatting values in placeholders (Maximilian Antoni)
- [`5bb9567`](https://github.com/sinonjs/referee/commit/5bb95675a854fbc30a69fee145ecfd9d3ef8a0f8)
  Drop manual newline escapes in favor of inspect in equals (Maximilian Antoni)

_Released by [Maximilian Antoni](https://github.com/mantoni) on 2020-10-03._

## 6.0.2

- [#183](https://github.com/sinonjs/referee/pull/183)
  Replace `@sinonjs/formatio` with `util.inspect` from NodeJS
- [`86fe254`](https://github.com/sinonjs/referee/commit/86fe254c2dd7538621d1c73e4952d381f035c1c1)
  Add missing test case for actualForMatch (Maximilian Antoni)
- [`a02ff67`](https://github.com/sinonjs/referee/commit/a02ff67110e20cacb282f6f7231fb5bde573432a)
  Fix coverage for define-assertion promise handling (Maximilian Antoni)
- [`a0c54a3`](https://github.com/sinonjs/referee/commit/a0c54a375de3f4e26f355df6d331f59112e235a1)
  Fix coverage for tagName (Maximilian Antoni)
- [`b8e18ff`](https://github.com/sinonjs/referee/commit/b8e18ff4ca75e3743c90d14f2bf3c1ef551e812c)
  Fix tests in node 14 (Maximilian Antoni)
- [`828f839`](https://github.com/sinonjs/referee/commit/828f839006f803252d8b8fb0e016067a15a2e9bc)
  Drop node 10, add node 14 (Maximilian Antoni)
- [`6944bd2`](https://github.com/sinonjs/referee/commit/6944bd232c71e6f3a5e827ac4b2db25d53f9e08a)
  Fix tests in node 12 (Maximilian Antoni)
- [`14c6903`](https://github.com/sinonjs/referee/commit/14c690376648a38c30ead1a65dc99e3ae7d16263)
  Prettier (Maximilian Antoni)
- [`0f7a5fe`](https://github.com/sinonjs/referee/commit/0f7a5fec6a76e17bd38e5364cd75af95e15672e9)
  Add support for special array interpolations (Maximilian Antoni)
- [`ababcdd`](https://github.com/sinonjs/referee/commit/ababcdda3c9c12ca7b7960d6029ab3b1bd1e27d0)
  Refactor property interpolation (Maximilian Antoni)
- [`ed71199`](https://github.com/sinonjs/referee/commit/ed71199076b4bfb5e1e42e54ab8932969c29ef50)
  Fix formatting related assertions (Maximilian Antoni)
- [`61f8522`](https://github.com/sinonjs/referee/commit/61f85226828fd8dd5dcbca337398b1e43c233c7d)
  Reinstall dependencies (Maximilian Antoni)
- [`6547c43`](https://github.com/sinonjs/referee/commit/6547c43eee8be53d92d4d3818b4655ce1bc5f851)
  Update lib/assertions/is-weak-map.test.js (Morgan Roderick)
- [`53bdcbb`](https://github.com/sinonjs/referee/commit/53bdcbbf726db03ca2af15e3112932e13e7291b9)
- [`dadce5e`](https://github.com/sinonjs/referee/commit/dadce5efb66ddb2d22a7bd204bdc171bade9a2e3)
  Add test for isURIError assertion included in API (Morgan Roderick)
- [`7b595df`](https://github.com/sinonjs/referee/commit/7b595df9eb569d4237bb4728939364c1c10743f5)
  Convert tests for isURIError to unit tests (Morgan Roderick)
- [`3546c9a`](https://github.com/sinonjs/referee/commit/3546c9ad6ef40e1cc4c0a8d84f1a85f99a16e448)
  Add test for isWeakMap assertion included in API (Morgan Roderick)
- [`7094fe0`](https://github.com/sinonjs/referee/commit/7094fe0e2db4274e5d0d5a3e7da078332f6664b9)
  Convert tests for isWeakMap to unit tests (Morgan Roderick)
- [`2479dc9`](https://github.com/sinonjs/referee/commit/2479dc912ac26067f66a4703d568c3b7411610fd)
  Add test for isWeakSet assertion included in API (Morgan Roderick)
- [`060ea31`](https://github.com/sinonjs/referee/commit/060ea31c4eae204b075959d6879b46f6c493a0a3)
  Convert tests for isWeakSet to unit tests (Morgan Roderick)
- [`d579789`](https://github.com/sinonjs/referee/commit/d579789306b46faecda4415cef558a54e3cd96c0)
  Add test for json assertion included in API (Morgan Roderick)
- [`745c9c3`](https://github.com/sinonjs/referee/commit/745c9c35901825bafd0915cb69f75ffe62274fc5)
  Convert tests for json assertion to unit tests (Morgan Roderick)
- [`a501c4a`](https://github.com/sinonjs/referee/commit/a501c4aa272d3c0ce6bc495602a1433f67932a75)
  Add test for keys assertion included in API (Morgan Roderick)
- [`8f048a4`](https://github.com/sinonjs/referee/commit/8f048a4478340856c559bfcc13d75970d601b870)
  Convert tests for keys assertion to unit tests (Morgan Roderick)
- [`eb3d756`](https://github.com/sinonjs/referee/commit/eb3d7562a5f2301db8d980c4464b36e86d3a354a)
  Add test for less assertion included in API (Morgan Roderick)
- [`d9c34d6`](https://github.com/sinonjs/referee/commit/d9c34d6b7d50520b00ecb771d27e8735fe39204b)
  Convert tests for less assertion to unit tests (Morgan Roderick)
- [`17cca82`](https://github.com/sinonjs/referee/commit/17cca82082d3f016f4ed37b12844dd437ac710b6)
  Add test for matchJson assertion included in API (Morgan Roderick)
- [`3c180f5`](https://github.com/sinonjs/referee/commit/3c180f5ea3d6450c56d00e7a9e2ffd6de6b7b91f)
  Convert tests for matchJson assertion to unit tests (Morgan Roderick)
- [`dd15901`](https://github.com/sinonjs/referee/commit/dd15901603845b0e4626786e968325b0142325a8)
  Add test for keys assertion included in API (Morgan Roderick)
- [`160196c`](https://github.com/sinonjs/referee/commit/160196c18bc91225913cf782614d0368533230e3)
  Convert tests for keys assertion to unit tests (Morgan Roderick)
- [`a5bfd2e`](https://github.com/sinonjs/referee/commit/a5bfd2ee09406884e282b35c6f3724016ed0efe3)
  Add test for less assertion included in API (Morgan Roderick)
- [`9f9659c`](https://github.com/sinonjs/referee/commit/9f9659cad4500df2da6bc844b07e0954d03a89d6)
  Convert tests for less assertion to unit tests (Morgan Roderick)
- [`60ac699`](https://github.com/sinonjs/referee/commit/60ac699c0bf62b62f9ee82288908e40c22250dbb)
  Add test for matchJson assertion included in API (Morgan Roderick)
- [`9d52c7c`](https://github.com/sinonjs/referee/commit/9d52c7c44bee5284906d7ccbbab4165be88c135b)
  Convert tests for matchJson assertion to unit tests (Morgan Roderick)
- [`e7f65dc`](https://github.com/sinonjs/referee/commit/e7f65dcb7a98922d61e05b249de2b35cb83cd2b9)
  Add test for near assertion included in API (Morgan Roderick)
- [`fc649dd`](https://github.com/sinonjs/referee/commit/fc649dda55d810fb6cacb8dcfa33d7c7aff21f99)
  Convert tests for near assertion to unit tests (Morgan Roderick)
- [`0825ec3`](https://github.com/sinonjs/referee/commit/0825ec37148f81eb91b58ca0ca28768e826b3d33)
  Add test for rejects assertion included in API (Morgan Roderick)
- [`1c526a8`](https://github.com/sinonjs/referee/commit/1c526a8cc103525dfb5d5c78f3af97ba2f276729)
  Convert tests for rejects to unit tests (Morgan Roderick)
- [`b8c4eec`](https://github.com/sinonjs/referee/commit/b8c4eece33d12e124d18207f90e2ca3aed40aefb)
  Add test for resolves assertion included in API (Morgan Roderick)
- [`2b9700f`](https://github.com/sinonjs/referee/commit/2b9700fddfa56e0dfb9faad640a027f2631c8f6b)
  Convert tests for resolves assertion to unit tests (Morgan Roderick)
- [`f891374`](https://github.com/sinonjs/referee/commit/f89137474a3615a6932ad36287b4edd1398fe25c)
  Add test for same assertion included in API (Morgan Roderick)
- [`ef15eee`](https://github.com/sinonjs/referee/commit/ef15eee070e1c237b8cdda37169dfb84b9d0e9ab)
  Convert tests for same assertion to unit tests (Morgan Roderick)
- [`727336b`](https://github.com/sinonjs/referee/commit/727336bf9e3af2e50ae3eb0baad7afa278b27639)
  Add test for tagName assertion included in API (Morgan Roderick)
- [`0682c81`](https://github.com/sinonjs/referee/commit/0682c813cbabaa602c7b3b0795fcaf64729b38ce)
  Convert tests for tagName assertion to unit tests (Morgan Roderick)
- [`593fd3f`](https://github.com/sinonjs/referee/commit/593fd3f8354222b449f17326d70789897f244ab0)
  Add test for isUint8ClampedArray assertion included in API (Morgan Roderick)
- [`72e9d30`](https://github.com/sinonjs/referee/commit/72e9d3007230ef4cee4c0ddf0bf2a3cfd1c754ac)
  Convert test for isUint8ClampedArray to unit tests (Morgan Roderick)
- [`9fdfc2c`](https://github.com/sinonjs/referee/commit/9fdfc2c7b81f9417c37238eb687877a5ea930afe)
  Add test for match assertion included in API (Morgan Roderick)
- [`a235f3f`](https://github.com/sinonjs/referee/commit/a235f3ff58041491d10ea0c5daa7e1cd5ea3b0bf)
  Convert tests for match to unit test (Morgan Roderick)
- [`5b7e628`](https://github.com/sinonjs/referee/commit/5b7e62883a10809d5d36221ff17d5988ae783280)
  Add test for isMap assertion in use (Morgan Roderick)
- [`c1ea169`](https://github.com/sinonjs/referee/commit/c1ea1690f8ea9d9800e0d5925a69c08dd8d63d5f)
  Convert tests for isMap to unit test (Morgan Roderick)
- [`cb34d2e`](https://github.com/sinonjs/referee/commit/cb34d2e26a23d0004539b088a52e08919911b1ed)
  Remove unused @sinonjs/formatio dependency (Morgan Roderick)
- [`dc8d9a6`](https://github.com/sinonjs/referee/commit/dc8d9a60e8d8ba80ff4a104d8e4123d76f23ce25)
  Replace formatio with node's util.inspect (Morgan Roderick)
- [`91d1f87`](https://github.com/sinonjs/referee/commit/91d1f87e6098976ca70f2a734c3e93b89a5867c9)
  Add proxyquire dependency (Morgan Roderick)
- [`f5637ce`](https://github.com/sinonjs/referee/commit/f5637cedb74a5f7deabbc5660a094f4138cc2591)
  Bump lodash from 4.17.15 to 4.17.19 (dependabot[bot])

_Released on 2020-10-02._

## 6.0.1

- [`ed9ca59`](https://github.com/sinonjs/referee/commit/ed9ca5912fa69f1852e5f2ebd761d5c27f494263)
  Properly stringify objects without prototype (Rens Groothuijsen)

_Released on 2020-06-29._

## 6.0.0

- [`b83a12e`](https://github.com/sinonjs/referee/commit/b83a12ed3a32b6f51ca1d4c0500dee76de7b5d46)
  npm audit (Maximilian Antoni)
- [`9c29ff1`](https://github.com/sinonjs/referee/commit/9c29ff1a783802a9d13f586039db5db5c6d375ff)
  test: exclude functions with underscore from public API assertions (Dominykas Blyžė)
- [`3010499`](https://github.com/sinonjs/referee/commit/30104997b85e11cc99c7a9e852e91953701ce67a)
  chore: remove dependency on bane (Dominykas Blyžė)
- [`af98b83`](https://github.com/sinonjs/referee/commit/af98b835616a8257c77144e986fdf16d0209843b)
  Fix using a regexp matcher to assert exceptions (Maximilian Antoni)

_Released by [Maximilian Antoni](https://github.com/mantoni) on 2020-06-16._

## 5.1.0

- [`f7cb8a9`](https://github.com/sinonjs/referee/commit/f7cb8a9953c5b613684facd433c7c34d41038098)
  Expose .equals (Morgan Roderick)
    >
    > This will make it easier for authors to write custom assertions
    >

_Released on 2020-05-27._

## 5.0.1

- [`a02521c`](https://github.com/sinonjs/referee/commit/a02521c1d35627ec454f2ac3848fdae3882cea95)
  Fix assert.equals referencing deprecated assert.defined (Ola Christian Gundelsby)
- [`c8c9ba0`](https://github.com/sinonjs/referee/commit/c8c9ba0787e81f04e828b9097e2f275c331c0c06)
  Bump @sinonjs/samsam from 5.0.2 to 5.0.3 (dependabot-preview[bot])
- [`b44daaa`](https://github.com/sinonjs/referee/commit/b44daaa645837d57197601391e8ff2e03ee305a6)
  Bump @sinonjs/commons from 1.7.0 to 1.7.1 (dependabot-preview[bot])

_Released by [Maximilian Antoni](https://github.com/mantoni) on 2020-03-03._

## 5.0.0

- [`af554b1`](https://github.com/sinonjs/referee/commit/af554b176f80be380f983b41024c6d9a0832c0ff)
  Upgrade formatio to v5, samsam to v5 and sinon to v9 (Maximilian Antoni)
    >
    > All three libraries have to be updated to consistently upgrade samsam.
    >
- [`f32b3a7`](https://github.com/sinonjs/referee/commit/f32b3a7c50fb7e5f563827e0d6ae2f9846307590)
  Add missing expectation property for resolves/rejects (Morgan Roderick)
    >
    > When these assertions were introduced in
    > 1af3c778914f044e601ecfaed7dcb070d301e53c, we overlooked the expectation
    > property.
    >
- [`1590076`](https://github.com/sinonjs/referee/commit/15900764e8b22b09610c828251fcded97ad0c4f9)
  Drop Node 8 support (Morgan Roderick)
    >
    > As can be seen at https://github.com/nodejs/Release, Node 8 reached
    > "end" of life on 2019-12-31, and is no longer actively supported.
    >
    > We will stop testing in Node 8 and start testing in Node 13, which will
    > become the next LTS release from April 2020.
    >

_Released on 2020-02-28._

## 4.0.0

- [`d475e62`](https://github.com/sinonjs/referee/commit/d475e624cfac65656c8c5bc4a1ac7ec0294f54a9)
  Upgrade @sinonjs/formatio and @sinonjs/samsam (Morgan Roderick)

_Released on 2019-12-21._
