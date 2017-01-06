import Ember from 'ember'
const {Router} = Ember

import config from './config/environment'

const DummyRouter = Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

DummyRouter.map(function () {
})

export default DummyRouter
