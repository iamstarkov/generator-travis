'use strict';
var yeoman = require('yeoman-generator');
var yaml = require('yamljs');
var sort = require('sort-object');
var mergeAndConcat = require('merge-and-concat');
var travisConfigKeys = require('travis-config-keys');
var ramda = require('ramda');

function sortByKeys(a, b) {
  return travisConfigKeys.indexOf(a) < travisConfigKeys.indexOf(b) ? -1 : 1;
}

module.exports = yeoman.generators.Base.extend({
  writing: {
    app: function () {
      var optionConfig =  this.options.config || {};
      var existingConfig = this.fs.exists(this.destinationPath('.travis.yml'))
            ? yaml.parse(this.fs.read(this.destinationPath('.travis.yml')))
            : {};
      var defaultConfig = yaml.parse(this.fs.read(this.templatePath('travisyml')));
      var resultConfig = mergeAndConcat(existingConfig, optionConfig, defaultConfig);
      var sortedResultConfig = sort(resultConfig, { sort: sortByKeys });
      sortedResultConfig.node_js = ramda.uniq(sortedResultConfig.node_js);
      this.fs.write(
        this.destinationPath('.travis.yml'),
        yaml.stringify(sortedResultConfig, 3, 2)
      );
    },
  },
});
