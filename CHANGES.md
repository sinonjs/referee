# Changes

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
