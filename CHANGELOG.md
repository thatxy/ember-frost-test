# 0.2.0

* **Updated** the `README.md` with examples using the latest `ember-mocha` and `ember-test-utils` stuff
* **Added** a section in the `README.md` about how to structure `describe`, `beforeEach` and `it` blocks within tests.
* **Added** `adapter-test` blueprint for generating adapter tests
* **Added** `controller-test` blueprint for generating controller tests
* **Updated** `component-test` blueprint to use new helpers from `ember-test-utils`
* **Added** `mixin-test` blueprint for generating mixin tests
* **Added** `model-test` blueprint for generating model tests
* **Added** `route-test` blueprint for generating route tests
* **Updated** `ember-frost-test` blueprint to install a bugfix branch of `testem` and make sure it's used by `ember-cli` to workaround [this bug](https://github.com/testem/testem/issues/1043) until the fix is merged/released. 
* **Fixed** a bug in `component-test` where generating a test for an addon was using `addon-name/tests/helpers` instead of `dummy/tests/helpers` to pull in `ember-test-utils` helpers.

# 0.1.0
* **Added** component-test blueprint generator


# 0.0.3
* **Updated** cleaned up CHANGELOG.md


# 0.0.2
* **Added** badges to README

# 0.0.1
* **Added** initial setup of `ember-frost-test` repo

