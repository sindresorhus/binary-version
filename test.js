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
