/**
 * Helper to make it easy to validate ember-cli blueprint file generators
 */

/* global afterEach, beforeEach, describe, it */
const chai = require('chai')
const exec = require('child_process').exec

const expect = chai.expect

/**
 * Verify that a blueprint generates correctly
 * @param {String} name - the name of the blueprint
 * @param {String[]} argumentList - the actual ember generate command arguments
 */
function itShouldGenerateCorrectly (name, argumentList) {
  describe(name, function () {
    this.timeout(5000)
    argumentList.forEach((args) => {
      const fullCmd = `ember g ${name} ${args}`
      describe(fullCmd, function () {
        let error, filename
        beforeEach(function (done) {
          error = null
          exec(fullCmd, function (err, stdout) {
            filename = stdout.split('\n').reverse()[1].replace('  create ', '')
            error = err
            done()
          })
        })

        afterEach(function (done) {
          exec(`ember d ${name} ${args}`, function () {
            done()
          })
        })

        it('should not error', function () {
          expect(error, error ? error.cause : '').to.equal(null)
        })

        describe('the generated file', function () {
          let output
          beforeEach(function (done) {
            error = null
            exec(`./node_modules/.bin/eslint ${filename}`, function (err, stdout, stderr) {
              output = stdout
              error = err
              done()
            })
          })

          it('should pass lint', function () {
            expect(output, output).to.equal('')
          })
        })
      })
    })
  })
}

module.exports = itShouldGenerateCorrectly
