module.exports = {
  afterInstall: function () {
    return this.addAddonsToProject({
      packages: [
        {name: 'ember-cli-mocha', target: '^0.11.0'},
        {name: 'ember-hook', target: '^1.3.5'},
        {name: 'ember-sinon', target: '~0.5.0'},
        {name: 'ember-test-utils', target: '^1.1.2'}
      ]
    })
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  }
}
