'use strict';
var path = require('path');
var childProcess = require('child_process');
var findVersions = require('find-versions');

module.exports = function (bin, cb) {
	var escapedBinPath;
	if (path.sep === '/') {
		// Unix
		escapedBinPath = bin.replace(/ /g, '\\ ');
	} else {
		// Windows
		if (bin.indexOf(' ') !== 1) {
			escapedBinPath = '"' + bin + '"';
		} else {
			escapedBinPath = bin;
		}
	}
	childProcess.exec(escapedBinPath + ' --version', function (err, stdout, stderr) {
		if (err) {
			if (err.code === 'ENOENT') {
				err.message = 'Couldn\'t find the `' + bin + '` binary. Make sure it\'s installed and in your $PATH';
			}

			return cb(err);
		}

		cb(null, findVersions(stdout.trim() || stderr.trim(), {loose: true})[0]);
	});
};
