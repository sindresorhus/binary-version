'use strict';
var childProcess = require('child_process');
var findVersions = require('find-versions');

module.exports = function (bin, optionsOrCallback, cb) {
	var args = ['--version'];

	if (arguments.length > 2) {
		args = optionsOrCallback.args;
	} else {
		cb = optionsOrCallback;
	}

	childProcess.exec(bin + ' ' + args.join(' '), function (err, stdout, stderr) {
		if (err) {
			if (err.code === 'ENOENT') {
				err.message = 'Couldn\'t find the `' + bin + '` binary. Make sure it\'s installed and in your $PATH';
			}

			return cb(err);
		}

		cb(null, findVersions(stdout.trim() || stderr.trim(), {loose: true})[0]);
	});
};
