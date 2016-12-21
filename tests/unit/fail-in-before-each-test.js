/**
 * This is a test that forces a failure in a beforeEach to make sure
 * that it is properly reported. We were seeing an issue with the latest `ember-mocha` where
 * testem wasn't reporting errors in this case
 */

import {expect} from 'chai'
import {beforeEach, describe, it} from 'mocha'

// TODO: un-skip this to confirm that mocha and testem are playing nice
describe.skip('Outer test that passes', function () {
  let foo
  beforeEach(function () {
    foo = 1
  })

  it('should pass', function () {
    expect(foo).to.equal(1)
  })

  describe('Inner test with bad beforeEach', function () {
    beforeEach(function () {
      throw new Error('error in beforeEach')
    })

    it('should have failed before it got here', function () {
      expect(foo).to.equal(1)
    })
  })
})
