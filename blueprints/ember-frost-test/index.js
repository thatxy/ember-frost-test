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

  /**
   * This very hacky workaround is to solve the following problem:
   * @see {@link https://github.com/testem/testem/issues/1043}
   * We install a specific version of `testem` (currently from github.com/job13er/testem#ember-frost-test)
   * But `ember-cli` will still have it's own version, so we need to create a `postinstall` npm script that will
   * remove the `node_modules/ember-cli/node_modules/testem` directory, letting `ember-cli` use the
   * `node_modules/testem` version instead.
   *
   * NOTE: once https://github.com/testem/testem/pull/1045 is merged/released and the version of `ember-cli`
   * we are using is picking it up, we can remove this and switch to something that makes sure that particular
   * script is gone.
   *
   * @returns {Promise} a promise when the `package.json` file has been updated
   */
  addPostInstallScript: function () {
    const content = '    "postinstall": "rm -rf node_modules/ember-cli/node_modules/testem",'
    return this.insertIntoFile('package.json', content, {
      after: '  "scripts": {' + EOL
    })
  },

  /**
   * This very hacky workaround since specifying a packaged as github org / repo doesn't seem to update
   * `package.json` properly, so in the meantime we just add it to `devDependencies` manually
   *
   * @returns {Promise} a promise when the `package.json` file has been updated
   */
  addTestemDepToPackageJson: function () {
    const content = '    "testem": "job13er/testem#ember-frost-test",'
    return this.insertIntoFile('package.json', content, {
      after: '  "devDependencies": {' + EOL
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

    const npmPackagesToAdd = [
      {name: 'job13er/testem#ember-frost-test'}
    ]

    const bowerPackagesToAdd = [
      {name: 'sinon-chai', target: '^2.8.0'},
      {name: 'chai-jquery', target: '^2.0.1'}
    ]

    return this.addAddonsToProject(addonsToAdd)
      .then(() => {
        return this.addPackagesToProject(npmPackagesToAdd)
      })
      .then(() => {
        this.ui.writeLine(chalk.green('Updating') + ' "package.json" to include forked "testem" (for now)')
        return this.addTestemDepToPackageJson()
      })
      .then(() => {
        return this.addBowerPackagesToProject(bowerPackagesToAdd)
      })
      .then(() => {
        this.ui.writeLine(chalk.green('Updating') + ' "ember-cli-build.js" to load "sinon-chai" and "chai-jquery"')
        return this.addLoadingOfTestHelpers()
      })
      .then(() => {
        this.ui.writeLine(chalk.green('Updating') + ' "package.json" with "postinstall" script')
        return this.addPostInstallScript()
      })
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  }
}
