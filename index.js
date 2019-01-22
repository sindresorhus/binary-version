'use strict';
const execa = require('execa');
const findVersions = require('find-versions');
const pLocate = require('p-locate');

const subCommandBinaries = [
	'openssl',
	'swiftlint'
];

const getArgs = (binary, args) => {
	if (Array.isArray(args)) {
		return [args];
	}

	if (subCommandBinaries.includes(binary)) {
		return [['version']];
	}

	return [
		['--version'],
		['version']
	];
};

const getVersion = (binary, args) => execa(binary, args)
	.then(result => findVersions(result.stdout || result.stderr, {loose: true})[0])
	.catch(error => {
		if (error.code === 'ENOENT') {
			error.message = `Couldn't find the \`${binary}\` binary. Make sure it's installed and in your $PATH`;
		}

		throw error;
	});

module.exports = (binary, options = {}) => {
	const versions = getArgs(binary, options.args).map(argument => getVersion(binary, argument));
	return pLocate(versions, version => Boolean(version), {concurrency: 1});
};
