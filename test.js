import test from 'ava';
import fn from './';

test.cb('curl', t => {
	fn('curl', (err, version) => {
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

test.cb('php', t => {
	fn('./fixture/php.js', (err, version) => {
		t.ifError(err);
		t.is(version, '7.0.0');
		t.end();
	});
});
