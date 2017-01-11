/**
 * Blueprint for generating a test for a frost controller
 * NOTE: this is run in node, not in ember stack, so limited es6 is available
 */

const utils = require('../utils')

module.exports = {
  description: 'Generates a frosty controller unit test.',
  locals: utils.common.locals
}
