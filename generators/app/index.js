'use strict';
var Generator = require('yeoman-generator');
var yaml = require('yamljs');
var sort = require('sort-object');
var mergeAndConcat = require('merge-and-concat');
var travisConfigKeys = require('travis-config-keys');
var ramda = require('ramda');
var got = require('got');

var supportedVersions = got('https://nodejs.org/dist/index.json', {
  json: true,
}).then(function(response) {
  var releases = response.body;

  return ramda.uniq(
    [releases[0]]
      .concat(
        releases.filter(function(release) {
          return release.lts;
        })
      )
      .map(function(release) {
        return release.version.split('.')[0];
      })
  );
});

function sortByKeys(a, b) {
  return travisConfigKeys.indexOf(a) < travisConfigKeys.indexOf(b) ? -1 : 1;
}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.',
    });

    this.option('removeOld', {
      type: Boolean,
      required: false,
      defaults: false,
      desc: 'Remove old versions from the current .travis.yml.',
    });
  }

  writing() {
    var optional = this.options.config || {};
    var existing = this.fs.exists(
      this.destinationPath(this.options.generateInto, '.travis.yml')
    )
      ? yaml.parse(
          this.fs.read(
            this.destinationPath(this.options.generateInto, '.travis.yml')
          )
        )
      : {};
    if (this.options.removeOld) {
      existing.node_js = [];
    }

    var defaults = yaml.parse(this.fs.read(this.templatePath('travisyml')));

    return supportedVersions.then(supportedVersions => {
      defaults.node_js = supportedVersions;

      var results = mergeAndConcat(existing, optional, defaults);
      var sortedResults = sort(results, { sort: sortByKeys });
      sortedResults.node_js = ramda.uniq(sortedResults.node_js);
      var sortedResultsString = yaml.stringify(sortedResults, 3, 2);

      this.fs.write(
        this.destinationPath(this.options.generateInto, '.travis.yml'),
        sortedResultsString
      );
    });
  }
};
