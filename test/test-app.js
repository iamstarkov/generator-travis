'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var yaml = require('yamljs');

var existingConfig = {
  language: 'node_js',
  node_js: [ 'stable', 'iojs' ],
  before_script: ['bower install'],
};
var yamlExistingConfig = yaml.stringify(existingConfig, 3, 2)

describe('travis:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({
        config: {
          node_js: [ 'iojs' ],
          after_script: ['npm run coveralls']
        }
      })
      .on('ready', function (gen) {
        gen.fs.write(gen.destinationPath('.travis.yml'), yamlExistingConfig);
      }.bind(this))
      .on('end', done);
  });

  it('creates config', function () {
    assert.file([
      '.travis.yml'
    ]);
  });

  it('extends existing config', function () {
    assert.fileContent(
      '.travis.yml',
      /bower install/
    );
  });

  it('uses config from options', function () {
    assert.fileContent(
      '.travis.yml',
      /npm run coveralls/
    );
  });

  it('uses config with extra node versions from options', function () {
    assert.fileContent(
      '.travis.yml',
      /iojs/
    );
  });
});
