'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();
    done();
  },
  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('travisyml'),
        this.destinationPath('.travis.yml')
      );
    },
  },
});
