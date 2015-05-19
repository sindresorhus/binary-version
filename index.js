'use strict';
var execFile = require('child_process').execFile;
var findVersions = require('find-versions');
var cygwin = process.platform === "win32" && (process.env.ORIGINAL_PATH || '').indexOf('/cygdrive/') != -1;

module.exports = function (bin, cb) {
	var args = ['--version'];
	if(cygwin) {
		args = ['-c', bin + ' --version'];
		bin = 'c:\\cygwin\\bin\\bash.exe';
	}
	execFile(bin, args, function (err, stdout, stderr) {
		if (err) {
			if (err.code === 'ENOENT') {
				err.message = 'Couldn\'t find the `' + bin + '` binary. Make sure it\'s installed and in your $PATH';
			}

			return cb(err);
		}

		cb(null, findVersions(stdout.trim() || stderr.trim(), {loose: true})[0]);
	});
};
