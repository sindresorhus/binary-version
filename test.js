import test from 'ava';
import binVersion from './index.js';

const versionRegex = /\d+\.\d+\.\d+/;

test('does-not-exist', async t => {
	await t.throwsAsync(binVersion('does-not-exist'), /Couldn't find/);
});

test('non-executable', async t => {
	await t.throwsAsync(binVersion('./fixture/non-executable.js'));
});

test('non-versioned', async t => {
	await t.throwsAsync(binVersion('./fixture/non-versioned.js'), /Couldn't find version/);
});

test('anything accepting `--version`', async t => {
	t.is(await binVersion('./fixture/versioned-type1.js'), '1.2.3');
});

test('anything accepting `version`', async t => {
	t.is(await binVersion('./fixture/versioned-type2.js'), '1.2.3');
});

test('curl', async t => {
	t.regex(await binVersion('curl'), versionRegex);
});

test('npm', async t => {
	t.regex(await binVersion('npm'), versionRegex);
});

test('openssl', async t => {
	t.regex(await binVersion('openssl'), versionRegex);
});

test('custom args', async t => {
	t.regex(await binVersion('./fixture/versioned-type1.js', {args: ['--version']}), versionRegex);
});

test('php', async t => {
	t.is(await binVersion('./fixture/php.js'), '7.0.0');
});
