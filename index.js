'use strict';
const execa = require('execa');
const findVersions = require('find-versions');

const knownBinaryArguments = new Map([
	...['ffmpeg', 'ffprobe', 'ffplay'].map(name => [name, ['-version']]),
	['openssl', ['version']]
]);

const defaultPossibleArguments = [
	['--version'],
	['version']
];

module.exports = async (binary, options = {}) => {
	let possibleArguments;

	if (options.args === undefined) {
		const customArgs = knownBinaryArguments.get(binary);
		if (customArgs === undefined) {
			possibleArguments = defaultPossibleArguments;
		} else {
			possibleArguments = [customArgs];
		}
	} else {
		possibleArguments = [options.args];
	}

	for (const args of possibleArguments) {
		try {
			// TODO: Use `{all}` instead of `{stdout, stderr}` when execa v2 is out
			const {stdout, stderr} = await execa(binary, args); // eslint-disable-line no-await-in-loop
			const [version] = findVersions(stdout || stderr, {loose: true});
			if (version !== undefined) {
				return version;
			}
		} catch (error) {
			if (error.code === 'ENOENT') {
				const newError = new Error(`Couldn't find the \`${binary}\` binary. Make sure it's installed and in your $PATH.`);
				newError.sourceError = error;
				throw newError;
			}

			if (error.code === 'EACCES') {
				throw error;
			}
		}
	}

	throw new Error(`Couldn't find version of \`${binary}\``);
};
