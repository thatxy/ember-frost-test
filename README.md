# ember-frost-test

This repo serves as the home for tools and conventions used in testing the frost ecosystem.

[![Travis][ci-img]][ci-url] [![NPM][npm-img]][npm-url]

## Installation

```bash
ember install ember-frost-test
```

## Testing Tools
We are using the following tools:

* [ember-cli-mocha](https://github.com/ember-cli/ember-cli-mocha) - This installs the [Mocha](http://mochajs.org)
 testing framework.
* [ember-cli-chai](https://github.com/ember-cli/ember-cli-chai) - This install the [Chai](http://chaijs.com)
 assertion library.
* [ember-hook](https://github.com/Ticketfly/ember-hook) - This is a tool we use to create a separation between the
DOM and our items under test.
* [ember-sinon](https://github.com/csantero/ember-sinon) - This is our method spying/stubbing/mocking tool.
* [ember-test-utils](https://github.com/ciena-blueplanet/ember-test-utils) - This provides our linting as well as
 test helpers that can be used to help test frost components.
* [chai-jquery](https://github.com/chaijs/chai-jquery) - This is a chai extention that provides assertions for jQuery.
* [sinon-chai](http://chaijs.com/plugins/sinon-chai/) - This is a chai extention that provides assertions for sinon.js.

## Testing Conventions

### Organizing your tests

For any unfamiliar with the BDD style `describe`/`beforeEach`/`it`, here's an overview of how one should
organize a test module.

#### Top level `describe`
Each module should contain a single top-level `describe` which explains what it is that's being tested. We have
test helpers to streamline formatting the message for this top-level `describe` label, but the current format is:

```
<testType> / <moduleType> / <nameOfModule> /
```

 * `testType` - `Unit`, `Integration` or  `Acceptance`
 * `moduleType` - `Component`, `Route`, `Controller`, etc.
 * `nameOfModule` - `frost-text`, `things`, etc.

We use `/` as a delimiter instead of '|' because when using `?grep=` to scope your tests in the URL, `|` is treated
like an `or` operator. We include a trailing `/` so that when clicking on the test for `frost-select` you don't
also get a test for `frost-select-outlet`.

#### Top level `beforeEach`/`afterEach`
The top-level `beforeEach` can be used to setup anything that will be needed for every use-case being tested, for
example, creating the `sinon` sandbox or creating an instance of the thing under test. The `afterEach` should be
used to clean up things that need cleaning after each `it`, like restoring all the stubs/spies in the sandbox.

#### Nested `describe` blocks
Additional `describe` blocks nested within the top-level `describe` serve one of two purposes, defining/declaring a
scope, or defining a use-case.

##### Defining/declaring a scope
A `describe` that is just grouping a set of other `describe` blocks because they are similar, generally won't need
a `beforeEach` because there's nothing to set up.

```javascript
describe('Computed Properties', function () {
 describe('foo', function () {
    // actual tests for foo
 })

 describe('bar', function () {
   // actual tests for bar
 })
})
```

##### Defining a use-case
The second, more common use of a nested `describe` is to describe/define a specific use-case, a state of the system or
an action being performed. The label for these `describe` blocks will often start with "when".
These types of `describe` blocks should always include a `beforeEach` which actually sets up the described state of
the system or performs the described action.

```javascript
describe('when the "text" property is set', function () {
  beforeEach(function () {
    component.set('text', 'foo bar baz')
  })

  // expect something
})

describe('when the button is clicked', function () {
  beforeEach(function () {
    this.$('button').click()
  })

  // expect something
})
```

#### `it() blocks`
The `it()` blocks are used to describe an expected outcome. They generally start with "should", this is so it reads
like English, "it should ..."

```javascript
it('should add the "foo-bar" class to the input element', function () {
  expect(this.$('input')).to.have.class('foo-bar')
})
```

You want to explain, in human-readable text, exactly what it is that's supposed to be happening, so that when the test
fails, a developer knows exactly what isn't working anymore.

As a rule-of-thumb, you should never be "doing something" in an `it()` the `it()` is for verifying the state of the
system. If you need to "do something" else before verifying, use a nested `describe` to describe what it is that
you are doing, and a `beforeEach` within that `describe` to actually do it.


### The role of acceptance/integration/unit tests

#### Acceptance tests are used to test user interaction and application flow

Some examples of what we would use an acceptance test for are:

Validating routes

```javascript
it('can visit /routeName', function (done) {
  visit('/routeName')

  return andThen(function () {
    expect(currentPath()).to.equal('routeName.index')
  })
})
```

Interacting with components/elements on a page to validate a behavior results in the expected outcome

```javascript
it('can create a user', function () {
  visit('/users')

  click(hook('createUserButton'))

  return andThen(function () {
    expect(hook('userRecord').length).to.equal(1)
  })
})
```

#### Integration tests are great for validating the DOM structure and changes to the DOM structure that result from interaction with a component's different properties and actions.

DOM structure altered via interaction with component:

```javascript
describe('when disabled property is set', function () {
  beforeEach(function () {
    this.render(hbs`
      {{frost-password
        disabled=true
      }}
    `)
  })

  it('should set the "disabled" prop on the inner <input> element', function () {
    expect(this.$('.frost-password input')).to.have.prop('disabled', true)
  })
})
```

Validate interacting with component fires closure action:

```javascript
describe('when onClick property is set', function() {
  let clickHandler
  beforeEach(function() {
    clickHandler = sinon.stub()
    this.setProperties({clickHandler})
    this.render(hbs`
      {{frost-link 'title'
        onClick=(action clickHandler)
      }}
    `)
  })

  describe('when the anchor tag is clicked', function() {
    beforeEach(function() {
      this.$('a').trigger('click')
    })

    it('should call the click handler', function() {
      expect(clickHandler).to.have.callCount(1)
    })
  })
})
```

#### Unit tests are used to test "units" of functionality

Some examples of what we would use a unit test for are:
Validating computed properties, object methods and observers

Computed Property:

```javascript
@readOnly
@computed('icon', 'text')
/**
 * Determine whether or not button is text only (no icon)
 * @param {String} icon - button icon
 * @param {String} text - button text
 * @returns {Boolean} whether or not button is text only (no icon)
 */
isTextOnly (icon, text) {
  return !isEmpty(text) && isEmpty(icon)
},

describe('"isTextOnly" computed property', function () {
  describe('when only "text" is set', function () {
    beforeEach(function() {
      component.set('text', 'testText')
    })

    it('should be true', function() {
      expect(component.get('isTextOnly')).to.equal(true)
    })
  })

  describe('when both "icon" and "text" are set', function () {
    beforeEach(function() {
      component.setProperties({
        icon: 'round-add'
        text: 'testText',
      })
    })

    it('should be false', function() {
      expect(component.get('isTextOnly')).to.equal(false)
    })
  })
})
```

Object Method:

```javascript
checkSelectionValidity (selection) {
  return typeOf(selection.onSelect) === 'function'
},

describe('checkSelectionValidity()', function () {
  let selection, ret
  describe('when selection is set properly', function () {
    beforeEach(function() {
      selection = {
        onSelect() {}
      }

      ret = component.checkSelectionValidity(selection)
    })

    it('should be true', function () {
      expect(ret).to.equal(true)
    })
  })

  describe('when selection is missing "onSelect" function', function () {
    beforeEach(function() {
      selection = {}

      ret = component.checkSelectionValidity(selection)
    })

    it('should be false', function () {
      expect(ret).to.equal(false)
    })
  })
})
```

Observer:

```javascript
doSomething: Ember.observer('foo', function() {
  this.set('other', 'yes');
})

describe('someThing', function () {
  let someThing
  beforeEach(function () {
    someThing = this.subject()
  })

  describe('when foo changes', function () {
    beforeEach(function() {
      someThing.set('foo', 'baz')
    })

    it('should set "other" to "yes"', function () {
      expect(someThing.get('other')).to.equal('yes')
    })
  })
})
```

### Use .to.eql() or .to.equal() instead of property based assertions

In our expect() we should use:

```javascript
expect(condition).to.eql(value) or expect(condition).to.equal(value)
```

instead of:

```javascript
expect(condition).to.be.ok
expect(condition).to.be.true
expect(condition).to.be.false
expect(condition).to.be.null
expect(condition).to.be.undefined
```

This is because property based assertions [are dangerous](https://github.com/chaijs/chai/issues/726).

### Use sinon.sandbox() for spying, stubbing, mocking methods.

Combined with `beforeEach()` and `afterEach()` we can easily create the sandbox before a test
and clean it up afterwards.

In an integration test:

```javascript
...
import sinon from 'sinon'

const test = integration('frost-whatever')
describe(test.label, function () {
  test.setup()

  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('when x happens', function () {
    beforeEach(function () {
      sandbox.spy(object, 'methodName')

      // do x
    })

    it('should call methodName', function () {
      expect(object.methodName).to.have.callCount(1)
    })
  })
})
```

In a unit test:

```javascript
...
import sinon from 'sinon'

describe('Unit / Mixin / FrostWhatever', function () {
  let sandbox, subject

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    subject = Controller.extend(FrostWhateverMixin).create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('when stuff happens', function () {
    beforeEach(function () {
      sandbox.stub(object, 'method').returns({1: true})

      // do stuff
    })

    it('should do some other stuff', function () {
      // expect some other stuff to have happened
    })
  })
})
```

## Requesting Changes (RFCS)
Updates to the tools and/or conventions used in ember-frost-test can be submitted for discussion
via the [RFC process](https://github.com/ciena-frost/ember-frost-test/blob/master/rfcs/README.md)

### Setup

```bash
git clone git@github.com:ciena-frost/ember-frost-test.git
cd ember-frost-list
npm install && bower install
```

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

[ci-img]: https://img.shields.io/travis/ciena-frost/ember-frost-test.svg "Travis CI Build Status"
[ci-url]: https://travis-ci.org/ciena-frost/ember-frost-test
[npm-img]: https://img.shields.io/npm/v/ember-frost-test.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/ember-frost-test
