/**
 * Unit test for the <%= dasherizedModuleName %> route
 */

import {expect} from 'chai'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import {route} from '<%= testHelpersPath %>/ember-test-utils/setup-test'

// To specify the other units that are required for this test:
// const test = route('<%= dasherizedModuleName %>', ['controller:<%= dasherizedModuleName %>'])
const test = route('<%= dasherizedModuleName %>')
describe(test.label, function () {
  test.setup()

  let sandbox, route

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    route = this.subject()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should exist', function () {
    expect(route).not.to.equal(undefined)
  })

  it('should have real tests', function () {
    expect(true).to.equal(false)
  })
})
