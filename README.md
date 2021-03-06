# generator-travis

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][depstat-image]][depstat-url]

> [Yeoman][yo] generator to get and keep `.travis.yml` up-to-date effortlessly.  
> [Works great with other generators too](#composability).

Travis CI uses `.travis.yml` file in the root of repository to learn about project and how developer wants their builds to be executed. Learn how to [get started building NodeJS projects][nodejs-get-started] and how to [customize your builds][travis-customize].

The configuration template includes the following NodeJS versions:

* v15 (From 2020-10-21 until **2021-06-30**)
* [v14][node-14] (until **2023-04-30**)
* [v12][node-12] (until **2022-04-30**)
* [v10][node-10] (until **2021-04-01**)

[yo]: http://yeoman.io/
[nodejs-get-started]: http://docs.travis-ci.com/user/languages/javascript-with-nodejs/
[travis-customize]: http://docs.travis-ci.com/user/customizing-the-build/

## Install

    npm install --global yo generator-travis

## Usage

    yo travis

## NodeJS versions in the config

Every LTS-supported version is included plus current one if its not LTS-supported.
The list of the versions is loaded from <https://nodejs.org/dist/index.json> at
run-time.

* NodeJS v15 will be added on 2020-10-21 and removed on **2021-06-30**.
* NodeJS [v14][node-14] will be removed on **2023-04-30**.
* NodeJS [v12][node-12] will be removed on **2022-04-30**.
* NodeJS [v10][node-10] will be removed on **2021-04-01**.

**All other versions, [except for those added through `options.config`](#compose),
are removed from the config.**

[![NodeJS LTS Timeline][node-lts-image]][node-lts-url]

[Read more][node-lts-url] about NodeJS long-term support/LTS.

## Composability

> Composability is a way to combine smaller parts to make one large thing. Sort of [like Voltron®][voltron]  
> — [Yeoman docs](http://yeoman.io/authoring/composability.html)

Just plug in _travis_ into your generator and let it handle your `.travis.yml` for you. Everybody wins.

### Install

    npm install --save generator-travis

#### Compose

```js
this.composeWith('travis', {}, {
  local: require.resolve('generator-travis')
});
```

Add any extra fields you need to `options.config` to extend the default configuration.

```js
this.composeWith('travis', { options: { config: {
  after_script: ['npm run coveralls'],
  node_js: ['v0.12']
}}}, {
  local: require.resolve('generator-travis')
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

[node-lts-url]: https://github.com/nodejs/Release
[node-lts-image]: https://raw.githubusercontent.com/nodejs/Release/master/schedule.svg?sanitize=true

[node-14]: https://nodejs.org/download/release/latest-v14.x/
[node-12]: https://nodejs.org/download/release/latest-v12.x/
[node-10]: https://nodejs.org/download/release/latest-v10.x/

[travis]: https://travis-ci.org/
