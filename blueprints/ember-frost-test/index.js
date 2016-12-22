/**
 * Install blueprint for ember-frost-test addon
 */

var chalk = require('chalk')
var EOL = require('os').EOL

module.exports = {
  /**
   * Add sinon-chai and chai-jquery bower libraries during testing
   * @returns {Promise} a promise when the `ember-cli-build.js` file has been updated
   */
  addLoadingOfTestHelpers: function () {
    const content =
      '  if ([\'test\', \'development\'].includes(app.env)) {' + EOL +
      '    ;[' + EOL +
      '      \'bower_components/sinon-chai/lib/sinon-chai.js\',' + EOL +
      '      \'bower_components/chai-jquery/chai-jquery.js\'' + EOL +
      '    ].forEach((path) => {' + EOL +
      '      app.import(path)' + EOL +
      '    })' + EOL +
      '  }' + EOL

    return this.insertIntoFile('ember-cli-build.js', content, {
      before: '  return app.toTree()' + EOL
    })
  },

  afterInstall: function () {
    const addonsToAdd = {
      packages: [
        {name: 'ember-cli-mocha', target: '^0.13.0'},
        {name: 'ember-hook', target: '^1.3.5'},
        {name: 'ember-sinon', target: '~0.5.0'},
        {name: 'ember-test-utils', target: '^1.3.2'}
      ]
    }

    const bowerPackagesToAdd = [
      {name: 'sinon-chai', target: '^2.8.0'},
      {name: 'chai-jquery', target: '^2.0.1'}
    ]

    return this.addAddonsToProject(addonsToAdd)
      .then(() => {
        return this.addBowerPackagesToProject(bowerPackagesToAdd)
      })
      .then(() => {
        this.ui.writeLine(chalk.green('Updating') + ' "ember-cli-build.js" to load "sinon-chai" and "chai-jquery"')
        return this.addLoadingOfTestHelpers()
      })
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter to us)
  }
}
