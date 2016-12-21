/**
 * Unit test for the <%= dasherizedModuleName %> model
 */

import {expect} from 'chai'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import {model} from '<%= testHelpersPath %>/ember-test-utils/setup-test'

// To specify the other units that are required for this test:
// const test = model('<%= dasherizedModuleName %>', ['model:fizz-bang'])
const test = model('<%= dasherizedModuleName %>')
describe(test.label, function () {
  test.setup()

  let sandbox, instance

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    instance = this.subject()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should exist', function () {
    expect(instance).not.to.equal(undefined)
  })

  it('should have real tests', function () {
    expect(true).to.equal(false)
  })
})
