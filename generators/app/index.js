'use strict';
var Generator = require('yeoman-generator');
var yaml = require('yamljs');
var sort = require('sort-object');
var mergeAndConcat = require('merge-and-concat');
var travisConfigKeys = require('travis-config-keys');
var ramda = require('ramda');
var lts = require('lts/lts');

var supportedVersions = ramda
  .toPairs(lts)
  .filter(function(pair) {
    var now = new Date();

    return new Date(pair[1].start) <= now && new Date(pair[1].end) >= now;
  })
  .map(function(pair) {
    return pair[0];
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
    defaults.node_js = supportedVersions;

    var results = mergeAndConcat(existing, optional, defaults);
    var sortedResults = sort(results, { sort: sortByKeys });
    sortedResults.node_js = ramda.uniq(sortedResults.node_js);

    var versions = sortedResults.node_js;
    sortedResults.node_js = [];
    var sortedResultsString = yaml.stringify(sortedResults, 3, 2);

    sortedResultsString = sortedResultsString.replace(
      'node_js: []',
      'node_js:\n' +
        versions
          .map(function(version) {
            var supportComment = '';

            if (lts[version]) {
              supportComment = ' # Supported until ' + lts[version].end;
            }

            return '  - ' + version + supportComment;
          })
          .join('\n')
    );

    this.fs.write(
      this.destinationPath(this.options.generateInto, '.travis.yml'),
      sortedResultsString
    );
  }
};
