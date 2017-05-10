# 1.0.3 (2017-05-10)
* **Updated** the secure auth tokens in `.travis.yml`


# 1.0.2
* **Updated** to use latest pr-bumper which supports being able to set a PR to `none` when publishing a new version is not desired.

# 1.0.1

* **Fixed** bug in the new blueprint test generators (all but `component-test` were broken
* **Added** automated tests for generating all files and making sure they pass lint


# 1.0.0
### Breaking
* **Swapped**  from `bower` versions of `sinon-chai` and `chai-jquery` to `npm` versions. Running the install
blueprint for this addon will remove the bower deps, and add npm deps, as well as clean up `ember-cli-build.js`
to undo what it previously added there. If you manually loaded `sinon-chai` and/or `chai-jquery` yourself in
`ember-cli-build.js` you'll need to manually undo that.

### Non-breaking
* **Updated** `eslint-config-frost-standard` and fixed new lint warnings


# 0.2.1

* **Removed** the `blueprint` hack to install a fork of `testem` and clear out the one under
`node_modules/ember-cli/node_modules/testem` since [the fix has been released](https://github.com/testem/testem/releases/tag/v1.14.1)


# 0.2.0

* **Updated** the `README.md` with examples using the latest `ember-mocha` and `ember-test-utils` stuff
* **Added** a section in the `README.md` about how to structure `describe`, `beforeEach` and `it` blocks within tests.
* **Added** `adapter-test` blueprint for generating adapter tests
* **Added** `controller-test` blueprint for generating controller tests
* **Updated** `component-test` blueprint to use new helpers from `ember-test-utils`
* **Added** `mixin-test` blueprint for generating mixin tests
* **Added** `model-test` blueprint for generating model tests
* **Added** `route-test` blueprint for generating route tests
* **Updated** `ember-frost-test` blueprint to install a bugfix branch of `testem` and make sure it's used by
`ember-cli` to workaround [this bug](https://github.com/testem/testem/issues/1043) until the fix is merged/released.
* **Fixed** a bug in `component-test` where generating a test for an addon was using `addon-name/tests/helpers`
instead of `dummy/tests/helpers` to pull in `ember-test-utils` helpers.

# 0.1.0
* **Added** component-test blueprint generator


# 0.0.3
* **Updated** cleaned up CHANGELOG.md


# 0.0.2
* **Added** badges to README

# 0.0.1
* **Added** initial setup of `ember-frost-test` repo

