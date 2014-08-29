'use strict';
var test = require('ava');
var binVersion = require('./');

test(function (t) {
	t.plan(2);

	binVersion('curl', function (err, version) {
		console.log('Version:', version);
		t.assert(!err, err);
		t.assert(/\d+\.\d+\.\d+/.test(version));
	});
});
