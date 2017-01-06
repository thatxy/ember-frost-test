/**
 * <%= capitalizedTestType %> test for the <%= dasherizedModuleName %> component
 */

import {expect} from 'chai'
<% if (testType === 'integration' ) { %>import {$hook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'<% } else { %>
import {afterEach, beforeEach, describe, it} from 'mocha'<% } %>
import sinon from 'sinon'

import {<%= testType %>} from '<%= testHelpersPath %>/ember-test-utils/setup-component-test'

const test = <%= testType %>('<%= dasherizedModuleName %>')
describe(test.label, function () {
  test.setup()

  <% if (testType === 'unit' ) { %>let component, sandbox<% } else { %>let sandbox<% } %>

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should have real tests', function () {
    expect(true).to.equal(false)
  })

  <% if (testType === 'integration' ) { %>describe('after render', function () {
    beforeEach(function () {
      this.setProperties({
        myHook: 'myThing'
      })

      this.render(hbs`
        {{<%= dasherizedModuleName %>
          hook=myHook
        }}
      `)

      return wait()
    })

    it('should have an element', function () {
      expect(this.$()).to.have.length(1)
    })

    it('should be accessible via the hook', function () {
      expect($hook('myThing')).to.have.length(1)
    })
  })<% } else { %>describe('when hook is given', function () {
    beforeEach(function () {
      component = this.subject({hook: 'myHook'})
    })

    it('should set hookPrefix', function () {
      expect(component.get('hookPrefix')).to.equal('myHook-')
    })
  })<% } %>
})
