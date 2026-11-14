"use strict";

const sinonConfig = require("@sinonjs/eslint-config");

module.exports = [
  {
    ignores: ["eslint.config.js", "docs/**"],
  },
  ...sinonConfig,
  {
    rules: {
      "jsdoc/require-returns": "off",
    },
  },
  {
    files: ["lib/assertions/json.js", "lib/assertions/match-json.js"],
    rules: {
      "no-unused-vars": "off",
    },
  },
];
