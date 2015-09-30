# generator-travis

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][depstat-image]][depstat-url]

>

## Install

    npm install --global yo generator-travis
    # or
    npm install --save generator-travis

## Usage

    yo travis

Or if you want to use this generator as composed generator, then do like this:

```js
module.exports = yeoman.generators.Base.extend({
  init: function() { /* … */ },
  writing: function() {
    this.composeWith('travis', {}, {
      local: require.resolve('generator-travis/generators/app/index.js')
    });
  },
  install: function () { /* … */ }
});
```

## Requirements

This generator should be suitable for these generators:

* [nm][nm], [config][nm-config]
* [node][node], [config][node-config]

[nm]: https://github.com/sindresorhus/generator-nm/
[nm-config]: https://github.com/sindresorhus/generator-nm/blob/master/app/templates/travis.yml
[node]: https://github.com/yeoman/generator-node
[node-config]: https://github.com/yeoman/generator-node/blob/master/generators/travis/templates/travis.yml


## License

MIT © [Vladimir Starkov](https://iamstarkov.com)

[npm-url]: https://npmjs.org/package/generator-travis
[npm-image]: https://img.shields.io/npm/v/generator-travis.svg?style=flat-square

[travis-url]: https://travis-ci.org/iamstarkov/generator-travis
[travis-image]: https://img.shields.io/travis/iamstarkov/generator-travis.svg?style=flat-square

[depstat-url]: https://david-dm.org/iamstarkov/generator-travis
[depstat-image]: https://david-dm.org/iamstarkov/generator-travis.svg?style=flat-square
