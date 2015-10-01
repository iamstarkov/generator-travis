# generator-travis

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][depstat-image]][depstat-url]

> Get up-to-date travis config

## Install

    npm install --global yo generator-travis

## Usage

    yo travis

## Composability

> Composability is a way to combine smaller parts to make one large thing. Sort of [like Voltron ®][voltron]  
> — [Yeoman docs](http://yeoman.io/authoring/composability.html)

Just plug in _travis_ into your generator and forget about keeping travis configs up to date.
This package will do it for you and your generator’s consumers. Everybody wins.

### Add it to your generator

    npm install --save generator-travis

### Compose it with your generator

```js
this.composeWith('travis', {}, {
  local: require('generator-travis')
});
```

[voltron]: http://25.media.tumblr.com/tumblr_m1zllfCJV21r8gq9go11_250.gif

## Requirements or public contract

This generator will be "up-to-date" and suitable for _at least_ these generators:

* [node][node]
* [nm][nm]

[nm]: https://github.com/sindresorhus/generator-nm/
[node]: https://github.com/yeoman/generator-node

## License

MIT © [Vladimir Starkov](https://iamstarkov.com)

[npm-url]: https://npmjs.org/package/generator-travis
[npm-image]: https://img.shields.io/npm/v/generator-travis.svg?style=flat-square

[travis-url]: https://travis-ci.org/iamstarkov/generator-travis
[travis-image]: https://img.shields.io/travis/iamstarkov/generator-travis.svg?style=flat-square

[depstat-url]: https://david-dm.org/iamstarkov/generator-travis
[depstat-image]: https://david-dm.org/iamstarkov/generator-travis.svg?style=flat-square
