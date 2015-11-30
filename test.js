'use strict';
var test = require('ava');
var binVersion = require('./');

test('does-not-exist',function(t) {
	t.plan(2);

	binVersion('does-not-exist', function (err) {
		t.assert(err.code, 'ENOENT');
		t.assert(err.message, 'Couldn\'t find the `does-not-exist` binary. Make sure it\'s installed in your $path');
	});
});

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

test('openssl', function (t) {
	t.plan(2);

	binVersion('openssl', {args: ['version']}, function (err, version) {
		t.assert(!err, err);
		t.assert(/\d+\.\d+\.\d+/.test(version), version);
	});
});
