"use strict";

// Internal helper. Used throughout to fail assertions if they receive
// too few arguments. The name is provided for a helpful error message.
function assertArgNum(fail, name, args, num) {
  if (args.length >= num) {
    return true;
  }

  fail(`[${name}] Expected to receive at least ${num} argument(s)`);

  return false;
}

module.exports = assertArgNum;
