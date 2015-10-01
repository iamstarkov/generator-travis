'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('travisyml'),
        this.destinationPath('.travis.yml')
      );
    },
  },
});
