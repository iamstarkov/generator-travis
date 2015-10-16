# generator-travis

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][depstat-image]][depstat-url]

> Get up-to-date travis config

You will get up-do-date travis config and will not loose existing config.  
Up to date config contains current node versions: stable (v4), 0.12 and 0.10.

It’s easiest way to get up-to-date travis config in your project.  
And easiest way to stop worrying about travis config if you are maintaining your own custom generators, just compose generator-travis with them.

## Install

    npm install --global yo generator-travis

## Usage

    yo travis

## NodeJS versions in the config

Every LTS-supported versions are included. Once version version become
LTS-unsuported it will be removed from this config and generator
will get minor version update.

* NodeJS v0.10 will be removed October 1, 2016.
* NodeJS v0.12 will be removed April 1, 2017.
* NodeJS v4.2.0 will be removed April 1, 2018.

More about NodeJS Long-term Support you can read in [NodeJS/LTS repo][NodeJS/LTS].

[NodeJS/LTS]: https://github.com/nodejs/LTS/

## Composability

> Composability is a way to combine smaller parts to make one large thing. Sort of [like Voltron ®][voltron]  
> — [Yeoman docs](http://yeoman.io/authoring/composability.html)

Just plug in _travis_ into your generator and forget about keeping travis configs up to date.
This package will do it for you and your generator’s consumers. Everybody wins.

### Add it to your generator

    npm install --save generator-travis

#### Compose it

```js
this.composeWith('travis', {}, {
  local: require.resolve('generator-travis/generators/app')
});
```

If you want somehow extend default config, define you extra fields to `config` field.

```js
this.composeWith('travis', { options: {
  config: { after_script: ['npm run coveralls'] }
}}, {
  local: require.resolve('generator-travis/generators/app')
});
```

[voltron]: http://25.media.tumblr.com/tumblr_m1zllfCJV21r8gq9go11_250.gif

## License

MIT © [Vladimir Starkov](https://iamstarkov.com)

[npm-url]: https://npmjs.org/package/generator-travis
[npm-image]: https://img.shields.io/npm/v/generator-travis.svg?style=flat-square

[travis-url]: https://travis-ci.org/iamstarkov/generator-travis
[travis-image]: https://img.shields.io/travis/iamstarkov/generator-travis.svg?style=flat-square

[depstat-url]: https://david-dm.org/iamstarkov/generator-travis
[depstat-image]: https://david-dm.org/iamstarkov/generator-travis.svg?style=flat-square
