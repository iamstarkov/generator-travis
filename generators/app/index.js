'use strict';
var yeoman = require('yeoman-generator');
var yaml = require('yamljs');
var deepAssign = require('deep-assign');

module.exports = yeoman.generators.Base.extend({
  writing: {
    app: function () {
      var optionConfig =  this.option.config || {};
      var currentConfigFile = this.destinationPath('.travis.yml');
      var configFile = this.templatePath('travisyml');

      // Re-read the content at this point because a composed generator might modify it.
      var currentConfig = this.fs.exists(currentConfigFile) ? yaml.parse(this.fs.read(currentConfigFile)) : {};
      var config = yaml.parse(this.fs.read(configFile));

      // Let's extend package.json so we're not overwriting user previous fields
      var resultConfig = deepAssign({}, currentConfig, optionConfig, config);

      this.fs.write(
        this.destinationPath('.travis.yml'),
        yaml.stringify(resultConfig, 3, 2)
      );
    },
  },
});
