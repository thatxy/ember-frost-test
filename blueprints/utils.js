/**
 * Shared functions used in multiple blueprints
 */

'use strict'

const normalizeEntityName = require('ember-cli-normalize-entity-name')
const stringUtil = require('ember-cli-string-utils')
const validComponentName = require('ember-cli-valid-component-name')
const path = require('path')

function getTestHelpersPath (options) {
  const dasherizedProjectName = stringUtil.dasherize(options.project.name())
  const isAddon = options.project.isEmberCLIAddon()
  return isAddon ? 'dummy/tests/helpers' : `${dasherizedProjectName}/tests/helpers`
}

module.exports = {
  common: {
    getTestHelpersPath,
    locals (options) {
      return {
        testHelpersPath: getTestHelpersPath(options)
      }
    }
  },

  component: {
    fileMapTokens: {
      /**
       * @param {Object} options - the options for the ember generate command
       * @returns {String} the path for the component being generated
       */
      path (options) {
        if (options.pod) {
          return path.join(options.podPath, options.locals.path, options.dasherizedModuleName)
        }
        return 'components'
      }
    },

    /**
     * Blueprint hook
     * @see {@link https://ember-cli.com/extending/#normalizeentityname}
     * @param {String} entityName - the requested name
     * @returns {String} the normalized, validated entity name (must be a valid component name)
     */
    normalizeEntityName (entityName) {
      entityName = normalizeEntityName(entityName)
      return validComponentName(entityName)
    }
  }
}
