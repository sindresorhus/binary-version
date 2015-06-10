'use strict';
var test = require('ava');
var binVersion = require('./');

test('curl', function (t) {
	t.plan(2);

	binVersion('curl', function (err, version) {
		t.assert(!err, err);
		t.assert(/\d+\.\d+\.\d+/.test(version), version);
	});
});

test('npm', function (t) {
	t.plan(2);

	binVersion('npm', function (err, version) {
		t.assert(!err, err);
		t.assert(/\d+\.\d+\.\d+/.test(version), version);
	});
});
