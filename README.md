# ember-frost-test

This repo servers as the home for tools and conventions used in testing the frost ecosystem.

## Installation

```bash
ember install ember-frost-test
```

## Testing Tools
We are using the following tools:

* [ember-cli-mocha](https://github.com/ember-cli/ember-cli-mocha) - This is our testing framework. It also includes ,chaijs our assertion library.
* [ember-hook](https://github.com/Ticketfly/ember-hook) - This is a tool we use to create a separation between the DOM and our items under test.
* [ember-sinon](https://github.com/csantero/ember-sinon) - This is our method spying/stubbing tool.
* [ember-test-utils](https://github.com/ciena-blueplanet/ember-test-utils) - These are our test helpers that can be used to help test frost components.

## Testing Conventions

### The role of acceptance/integration/unit tests

#### Acceptance tests are used to test user interaction and application flow

Some examples of what we would use an acceptance test for are:
Validating routes

```javascript
it('can visit /routeName', function (done) {
  visit('/routeName')

  andThen(function () {
    expect(currentPath()).to.equal('routeName.index')
  })
})
```

Interacting with components/elements on a page to validate a behavior results in the expected outcome

```javascript
it('can create a user', function () {
  visit(/users)

  click(hook('createUserButton'))

  andThen(function () {
    expect(hook('userRecord').length).to.equal(1)
  })
})
```

#### Integration tests are great for validating the DOM structure and changes to the DOM structure that result from interaction with a component's different properties and actions.

DOM structure altered via interaction with component:

```javascript
it('sets disabled property', function () {
  this.render(hbs`
    {{frost-password
      disabled=true
    }}
 `)

  expect(
    this.$('.frost-password').find('input').prop('disabled')
  ).to.eql(true)
})
```

Validate interacting with component fires closure action:

```javascript
it('calls onClick closure action', function () {
  const externalActionSpy = sandbox.spy()

  this.on('externalAction', externalActionSpy)

  this.render(hbs`
    {{frost-link 'title'
      onClick=(action 'externalAction')
    }}
  `)

  this.$('a').trigger('click')

  expect(externalActionSpy.called).to.eql(true)
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
  it('is set to "true" when "text" is set', function () {
    run(() => component.set('text', 'testText'))

    expect(
      component.get('isTextOnly'),
      'isTextOnly: true'
    ).to.eql(true)
  })

  it('is set to "false" when "icon" and "text" are both set', function () {
    run(() => {
      component.set('icon', 'round-add')
      component.set('text', 'testText')
    })

    expect(component.get('isTextOnly')).to.eql(false)
  })
})
```

Object Method:

```javascript
checkSelectionValidity (selection) {
    return typeOf(selection.onSelect) === 'function'
  },

describe('checkSelectionValidity()', function () {
  it('returns "true" when "selection" is set Properly', function () {
    const selection = {
      onSelect: function () {}
    }

    expect(
      component.checkSelectionValidity(selection)
    ).to.eql(true)
  })

  it('returns "false" when "onSelect" function is missing in "selection"', function () {
    const selection = {}

    expect(
      component.checkSelectionValidity(selection),
    ).to.eql(false)
  })
})
```

Observer:

```javascript
doSomething: Ember.observer('foo', function() {
  this.set('other', 'yes');
})

it('should set other prop to yes when foo changes', function() {
  const someThing = this.subject()

  someThing.set('foo', 'baz')

  expect(someThing.get('other'))to.eql('yes')
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

### Use sinon.sandbox() for spying, stubbing, mocking methods.

Combined with beforeEach() and afterEach() we can easily create the sandbox before a test and clean it up afterwards.

In an integration test:

```javascript
...
import sinon from 'sinon'

describeComponent(
  'frost-whatever',
  'Integration: FrostWhateverComponent',
  {
    integration: true
  },
  function () {
    let sandbox

    beforeEach(function () {
      sandbox = sinon.sandbox.create()
    })

    afterEach(function () {
      sandbox.restore()
    })

    it('test title here', function () {
        const testSpy = sandbox.spy(object, 'methodName')

        //Test stuff here

        expect(testSpy.called).to.eql(true)
      })
  }
)
```

In a unit test:

```javascript
...
import sinon from 'sinon'

describe('Unit: FrostWhateverMixin', function () {
  let sandbox, subject

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    let testObject = Controller.extend(FrostWhateverMixin)
    subject = testObject.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('test title here', function () {
    sandbox.stub(object, 'method').returns({ 1: true })

    //Test stuff here
  })
})
```

## Requesting Changes (RFCS)
Updates to the tools and/or conventions used in ember-frost-test can be submitted for discussion
via the [RFC process](http://github.com/ciena-frost/ember-frost-test/rfcs/README.md)

## Development

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
