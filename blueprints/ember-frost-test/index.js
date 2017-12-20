/**
 * Install blueprint for ember-frost-test addon
 */
module.exports = {
  afterInstall: function () {
    const addonsToAdd = {
      packages: [
        {name: 'ember-hook', target: '1.4.2'},
        {name: 'ember-sinon', target: '^0.7.0'},
        {name: 'ember-test-utils', target: '^8.0.0'}
      ],
      blueprintOptions: {
        saveExact: true
      }
    }

    const packagesToAdd = [
      {name: 'ember-cli-mocha', target: '0.14.4'},
      {name: 'ember-cli-chai', target: '0.4.3'},
      {name: 'sinon-chai', target: '^2.14.0'},
      {name: 'chai-jquery', target: '^2.0.0'}
    ]

    return this.addAddonsToProject(addonsToAdd)
      .then(() => {
        return this.addPackagesToProject(packagesToAdd)
      })
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter to us)
  }
}
