'use strict';
var assert = require('assert');
var binVersion = require('./');

it('should get the semver version of a binary', function (cb) {
	binVersion('curl', function (err, version) {
		console.log('Version:', version);
		assert(!err, err);
		assert(/\d+\.\d+\.\d+/.test(version));
		cb();
	});
});
