import test from 'ava';
import binVersion from '.';

const reVersion = /\d+\.\d+\.\d+/;

test('does-not-exist', async t => {
	await t.throwsAsync(binVersion('does-not-exist'), /Couldn't find/);
});

test('curl', async t => {
	t.regex(await binVersion('curl'), reVersion);
});

test('npm', async t => {
	t.regex(await binVersion('npm'), reVersion);
});

test('openssl', async t => {
	t.regex(await binVersion('openssl', {args: ['version']}), reVersion);
});

test('php', async t => {
	t.is(await binVersion('./fixture/php.js'), '7.0.0');
});

test('sub-command', async t => {
	t.is(await binVersion('./fixture/sub-command.js'), '0.0.0');
});
