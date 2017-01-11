/**
 * Blueprint for generating a test for a frost route
 * NOTE: this is run in node, not in ember stack, so limited es6 is available
 */

const utils = require('../utils')

module.exports = {
  description: 'Generates a frosty route unit test.',
  locals: utils.common.locals
}
