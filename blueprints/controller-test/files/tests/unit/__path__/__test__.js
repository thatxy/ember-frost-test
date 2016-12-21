/**
 * Unit test for the <%= dasherizedModuleName %> controller
 */

import {expect} from 'chai'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import {controller} from '<%= testHelpersPath %>/ember-test-utils/setup-test'

// To specify the other units that are required for this test:
// const test = controller('<%= dasherizedModuleName %>', ['route:<%= dasherizedModuleName %>'])
const test = controller('<%= dasherizedModuleName %>')
describe(test.label, function () {
  test.setup()

  let sandbox, controller

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    controller = this.subject()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should exist', function () {
    expect(controller).not.to.equal(undefined)
  })

  it('should have real tests', function () {
    expect(true).to.equal(false)
  })
})
