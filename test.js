import test from 'ava';
import fn from './';

const reVersion = /\d+\.\d+\.\d+/;

test('does-not-exist', async t => {
	await t.throws(fn('does-not-exist'), /Couldn't find/);
});

test('curl', async t => {
	t.true(reVersion.test(await fn('curl')));
});

test('npm', async t => {
	t.true(reVersion.test(await fn('npm')));
});

test('openssl', async t => {
	t.true(reVersion.test(await fn('openssl', {args: ['version']})));
});

test('php', async t => {
	t.is(await fn('./fixture/php.js'), '7.0.0');
});
