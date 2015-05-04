'use strict';

// gulp-assets-manifest by zyk 2015

var gutil = require('gulp-util'),	
		path = require('path'),
		through = require('through2');

var File = gutil.File;
var PluginError = gutil.PluginError;

module.exports = function(file, options) {

	if (!file) {
		throw new PluginError('assets-manifest', 'Missing file for gulp-assets-manifest');
	}

	options = options || {};

	var pathSeparator = options.pathSeparator || path.sep;
	var assetsDir = options.assetsDir || 'assets' + pathSeparator;

	var retina = options.retina || false;
	var retinaPrefix = options.retinaPrefix || '_2x';

	var fileName;
	var manifestFile;
	var manifest = {};

	// preloadjs's simple structure
	manifest.path = assetsDir;
	manifest.manifest = [];

	if (typeof file === 'string') {
		fileName = file;
	}
	else if (typeof file.path === 'string') {
		fileName = path.basename(file.path);
		manifestFile = new File(file);
	}
	else {
		throw new PluginError('gulp-assets-manifest', 'Missing path in file options for gulp-assets-manifest');
	}

	function processFile(file, enc, cb) {
		if (file.isNull()) {
			cb();
			return;
		}

		if (!manifestFile) {
			manifestFile = file;
		}

		// add file to manifest
		var inputFileName = file.path.split(assetsDir)[1];

		if (typeof(inputFileName) === 'undefined' ) {
			cb();
			return;
		}

		if (!retina) {

			// skip retina
			if (inputFileName.split('.')[0].indexOf(retinaPrefix) != -1) {
				cb();
				return;
			}

			manifest.manifest.push(inputFileName);
			cb();
		}

		// only retina
		else {

			if (inputFileName.split('.')[0].indexOf(retinaPrefix) != -1) {
				manifest.manifest.push(inputFileName);
				cb();
				return;
			}
			else {
				cb();
				return;
			}

		}

	}

	function endStream(cb) {
		var joinedFile;

		if (!manifestFile || manifest.manifest.length < 1) {
			cb();
			return;
		}
		
		if (typeof file === 'string') {
			joinedFile = manifestFile.clone({ contents: false });
			joinedFile.path = path.join(manifestFile.base, file);
		} else {
			joinedFile = manifestFile;
		}

		joinedFile.contents = new Buffer(JSON.stringify(manifest));
		this.push(joinedFile);
		cb();

	}

	return through.obj(processFile, endStream);
};

