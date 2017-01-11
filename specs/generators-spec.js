/**
 * Mocha spec for the blueprint generators
 */

'use strict'

const itShouldGenerateCorrectly = require('../validate-generator')

itShouldGenerateCorrectly('adapter-test', [
  'foo-bar'
])

itShouldGenerateCorrectly('component-test', [
  'foo-bar',
  'foo-bar --unit',
  'foo-bar --pod',
  'foo-bar --unit --pod'
])

itShouldGenerateCorrectly('controller-test', [
  'foo-bar'
])

itShouldGenerateCorrectly('mixin-test', [
  'foo-bar'
])

itShouldGenerateCorrectly('model-test', [
  'foo-bar'
])

itShouldGenerateCorrectly('route-test', [
  'foo-bar'
])
