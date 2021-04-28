import test from 'ava';
import binaryVersion from './index.js';

const versionRegex = /\d+\.\d+\.\d+/;

test('does-not-exist', async t => {
	await t.throwsAsync(binaryVersion('does-not-exist'), {message: /Couldn't find/});
});

test('non-executable', async t => {
	await t.throwsAsync(binaryVersion('./fixture/non-executable.js'));
});

test('non-versioned', async t => {
	await t.throwsAsync(binaryVersion('./fixture/non-versioned.js'), {message: /Couldn't find version/});
});

test('anything accepting `--version`', async t => {
	t.is(await binaryVersion('./fixture/versioned-type1.js'), '1.2.3');
});

test('anything accepting `version`', async t => {
	t.is(await binaryVersion('./fixture/versioned-type2.js'), '1.2.3');
});

test('curl', async t => {
	t.regex(await binaryVersion('curl'), versionRegex);
});

test('npm', async t => {
	t.regex(await binaryVersion('npm'), versionRegex);
});

test('openssl', async t => {
	t.regex(await binaryVersion('openssl'), versionRegex);
});

test('custom args', async t => {
	t.regex(await binaryVersion('./fixture/versioned-type1.js', {args: ['--version']}), versionRegex);
});

test('php', async t => {
	t.is(await binaryVersion('./fixture/php.js'), '7.0.0');
});
