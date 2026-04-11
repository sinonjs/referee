"use strict";

const sinonConfig = require("@sinonjs/eslint-config");

module.exports = [
  {
    ignores: ["eslint.config.js", "coverage/**", "dist/**", "docs/**", "site/**"],
  },
  ...sinonConfig,
  {
    rules: {
      "jsdoc/require-returns": "off",
    },
  },
  {
    files: ["lib/**/*.test.js"],
    rules: {
      "mocha/consistent-spacing-between-blocks": "off",
      "no-unused-vars": [
        "error",
        { vars: "all", args: "after-used", caughtErrors: "none" },
      ],
    },
  },
  {
    files: ["lib/assertions/json.js", "lib/assertions/match-json.js"],
    rules: {
      "no-unused-vars": "off",
    },
  },
  {
    languageOptions: {
      globals: {
        ArrayBuffer: false,
        Uint8Array: false,
      },
    },
  },
];
