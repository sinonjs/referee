# Changes

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
