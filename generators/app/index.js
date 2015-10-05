'use strict';
var yeoman = require('yeoman-generator');
var yaml = require('yamljs');
var deepAssign = require('deep-assign');
var sort = require('sort-object');

var keysOrder = [
  'language',
  'node_js',
  'install',
  'cache',
  'before_script',
  'script',
  'after_success',
  'after_failure',
  'after_script',
  'before_deploy',
  'deploy',
  'after_deploy',
  'env'
];

function sortByKeys(a, b) {
  return keysOrder.indexOf(a) < keysOrder.indexOf(b) ? -1 : 1;
}

module.exports = yeoman.generators.Base.extend({
  writing: {
    app: function () {
      var optionConfig =  this.options.config || {};
      var existingConfig = this.fs.exists(this.destinationPath('.travis.yml'))
            ? yaml.parse(this.fs.read(this.destinationPath('.travis.yml')))
            : {};
      var defaultConfig = yaml.parse(this.fs.read(this.templatePath('travisyml')));
      var resultConfig = deepAssign({}, existingConfig, optionConfig, defaultConfig);
      var sortedResultConfig = sort(resultConfig, { sort: sortByKeys });
      this.fs.write(
        this.destinationPath('.travis.yml'),
        yaml.stringify(sortedResultConfig, 3, 2)
      );
    },
  },
});
