'use strict';

module.exports.DEFAULT_COMMAND = `--help`;

module.exports.DEFAULT_OFFERS_VALUE = 1;

module.exports.DEFAULT_PORT = 3000;

module.exports.USER_ARGV_INDEX = 2;

module.exports.MAX_OFFERS = 1000;

module.exports.ExitCode = {
  error: 1,
  success: 0,
};

module.exports.HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};
