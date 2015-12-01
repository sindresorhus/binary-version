# bin-version [![Build Status](https://travis-ci.org/sindresorhus/bin-version.svg?branch=master)](https://travis-ci.org/sindresorhus/bin-version)

> Get the version of a binary in [semver](https://github.com/isaacs/node-semver) format


## Install

```
$ npm install --save bin-version
```


## Usage

```
$ which curl
/usr/bin/curl
$ curl --version
curl 7.30.0 (x86_64-apple-darwin13.0)
$ mkdir /tmp/test\ with\ space
$ ln -s /usr/bin/curl /tmp/test\ with\ space/curl
```

```js
const binVersion = require('bin-version');

binVersion('curl', (err, version) => {
	console.log(version);
	//=> '7.30.0'
});
binVersion('/usr/bin/curl', (err, version) => {
	console.log(version);
	//=> '7.30.0'
});
binVersion('/tmp/test with space/curl', (err, version) => {
	console.log(version);
	//=> '7.30.0'
});
// On Windows
binVersion('C:\\Program Files (x86)\\nodejs\\node.exe', function(err, version) {
	console.log(version);
	//=> '0.12.2'
});
```


## CLI

See the [find-versions](https://github.com/sindresorhus/find-versions#cli) CLI.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
