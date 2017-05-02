import test from 'ava';
import m from '.';

const reVersion = /\d+\.\d+\.\d+/;

test('does-not-exist', async t => {
	await t.throws(m('does-not-exist'), /Couldn't find/);
});

test('curl', async t => {
	t.true(reVersion.test(await m('curl')));
});

test('npm', async t => {
	t.true(reVersion.test(await m('npm')));
});

test('openssl', async t => {
	t.true(reVersion.test(await m('openssl', {args: ['version']})));
});

test('php', async t => {
	t.is(await m('./fixture/php.js'), '7.0.0');
});
