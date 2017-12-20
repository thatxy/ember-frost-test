/**
 * Install blueprint for ember-frost-test addon
 */

const Promise = require('bluebird')
const chalk = require('chalk')
const cpExec = require('child_process').exec

const exec = Promise.promisify(cpExec)

module.exports = {
  /*
   * No idea why, but the default addPackagesToProject is installing the packages, but not updating
   * package.json, so this is a temporary fix for that.
   */
  addPackagesToProject: function (packagesToAdd) {
    const packageNameStr = packagesToAdd.map(pkg => pkg.name).join(' ')
    this.ui.writeLine(chalk.green('Installing packages') + ` ${packageNameStr}`)
    const pkgInstallStr = packagesToAdd.map(pkg => `${pkg.name}@${pkg.target}`).join(' ')
    return exec(`npm install --save-dev ${pkgInstallStr}`)
  },

  afterInstall: function () {
    const addonsToAdd = {
      packages: [
        {name: 'ember-cli-mocha', target: '0.14.4'},
        {name: 'ember-hook', target: '1.4.2'},
        {name: 'ember-sinon', target: '^0.7.0'},
        {name: 'ember-test-utils', target: '^8.0.0'}
      ]
    }

    const packagesToAdd = [
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
