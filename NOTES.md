This addon provides consistent testing dependencies for frost projects via the blueprint's addPackageToProject method of this project. This was done so that the specific versions of each package being installed could be controlled.

In doing so, packages and generators that were previously provided via their own blueprints have been migrated to this
 addon. The generators have been migrated to run as blueprint generators for this repo such as the removal of
 `ember-cli-qunit` and the updating of the `test-helper.js` file to use `ember-cli-mocha` instead of `ember-cli-qunit`.

Additionally, installation of packages such as `ember-cli-chai` via the blueprints of `ember-cli-mocha` are included
 via the addPackagesToProject method of this addon since the blueprints of `ember-cli-mocha` are no longer being run.