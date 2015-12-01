import test from 'ava';
import fn from './';

test.cb('does-not-exist', function (t) {
	fn('does-not-exist', function (err) {
		t.assert(err.code, 'ENOENT');
		t.assert(err.message, 'Couldn\'t find the `does-not-exist` binary. Make sure it\'s installed in your $path');
		t.end();
	});
});

test.cb('curl', function (t) {
	fn('curl', function (err, version) {
		t.ifError(err);
		t.true(/\d+\.\d+\.\d+/.test(version), version);
		t.end();
	});
});

test.cb('npm', t => {
	fn('npm', (err, version) => {
		t.ifError(err);
		t.true(/\d+\.\d+\.\d+/.test(version), version);
		t.end();
	});
});

test.cb('openssl', function (t) {
	fn('openssl', {args: ['version']}, function (err, version) {
		t.assert(!err, err);
		t.assert(/\d+\.\d+\.\d+/.test(version), version);
		t.end();
	});
});

test.cb('php', t => {
	fn('./fixture/php.js', (err, version) => {
		t.ifError(err);
		t.is(version, '7.0.0');
		t.end();
	});
});
