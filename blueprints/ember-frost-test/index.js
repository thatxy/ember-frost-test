/**
 * Install blueprint for ember-frost-test addon
 */

const Promise = require('bluebird')
const chalk = require('chalk')
const cpExec = require('child_process').exec
const exec = Promise.promisify(cpExec)

module.exports = {

  /*
   * Our own addPackagesToProject method that respects the save-exact flag
   * @function
   * @override
   * @param {Object[]} packagesToAdd - This is the package name, target and optional save-exact flag
   * @returns {Promise} - npm commands to be executed
   */
  addPackagesToProject: function (packagesToAdd) {
    const installCommands = []

    packagesToAdd.forEach((pkg) => {
      this.ui.writeLine(chalk.green('Installing package') + ` ${pkg.name}`)
      installCommands.push(
        exec(`npm install --save-dev ${pkg.name}@${pkg.target} ${pkg.saveExact ? '--save-exact' : ''}`)
      )
    })

    return Promise.all(installCommands)
  },

  afterInstall: function () {
    const packagesToAdd = [
      {name: 'ember-cli-mocha', target: '0.14.4', 'saveExact': true},
      {name: 'ember-cli-chai', target: '0.4.3', 'saveExact': true},
      {name: 'ember-hook', target: '1.4.2', 'saveExact': true},
      {name: 'ember-sinon', target: '^0.7.0'},
      {name: 'ember-test-utils', target: '^8.0.0'},
      {name: 'sinon-chai', target: '^2.14.0'},
      {name: 'chai-jquery', target: '^2.0.0'}
    ]

    return this.addPackagesToProject(packagesToAdd).catch((error) => {
      this.ui.writeLine(chalk.red(error))
      this.ui.writeLine('\n')
      this.ui.writeLine(chalk.red('After determining which package failed, you will need to rerun this generator'))
      this.ui.writeLine('\n')
    })
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter to us)
  }
}
