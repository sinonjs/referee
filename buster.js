exports["browser"] = {
    environment: "browser",
    libs: [
        "node_modules/when/es6-shim/Promise.js",
        "node_modules/lodash/dist/lodash.js",
        "node_modules/samsam/lib/samsam.js",
        "node_modules/bane/lib/bane.js"
    ],
    sources: [
        "lib/expect.js",
        "lib/referee.js"
    ],
    testHelpers: ["test/test-helper.js"],
    tests: ["test/*-test.js"]
};

exports["node"] = {
    environment: "node",
    testHelpers: [
        "node_modules/when/es6-shim/Promise.js",
        "test/test-helper.js"
    ],
    tests: [
        "test/*-test.js"
    ]
};
