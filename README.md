
## Information

<table>
<tr>
<td>Package</td><td>gulp-assets-manifest</td>
</tr>
<tr>
<td>Description</td>
<td>Generates assets json files for preload.js</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.10</td>
</tr>
</table>

## Usage

```js
var assetsManifest = require('gulp-assets-manifest');

// non-retina assets
gulp.task('assets_manifest', function() {
	gulp.src('./src/assets/images/**/*')
		.pipe(assetsManifest('assets.json'))
		.pipe(gulp.dest('./dist/'));

	// retina
	gulp.src('./src/assets/images/**/*')
		.pipe(assetsManifest('retina_assets.json', { retina: true, retinaPrefix: '_2x' }))
		.pipe(gulp.dest('./dist/'));
});

```

This will take all (non-retina) filenames and output a assets manifest file that [PreloadJS](https://github.com/CreateJS/PreloadJS) can parse.

Files will be added to the assets file in the order that they are specified in the `gulp.src` function.

By default, retina files specified by the `retinaPrefix` option will not be added.

## Options

<table>
<tr>
<td>Option</td><td>Description</td><td>Default value</td>
</tr>

<tr>
<td>assetsDir</td>
<td>Top directory that will be specified in the manifest file</td>
<td>"assets/"</td>
</tr>

<tr>
<td>retina</td>
<td>Only process files with retinaPrefix in their filename. Default is to skip them.</td>
<td>false</td>
</tr>

<tr>
<td>retinaPrefix</td>
<td>Retina prefix used in filenames that are retina assets</td>
<td>"_2x"</td>
</tr>

<tr>
<td>pathSeparator</td>
<td>Set directory path separator. Useful when running windows but deploying on servers</td>
<td>OS specific (path.sep)</td>
</tr>

</table>


## LICENSE

(MIT License)

Copyright (c) 2015 [Acne](http://www.acne.se) zyk@acne.se

Rewritten [gulp-concat](https://www.npmjs.com/package/gulp-concat) made by Fractal:

Copyright (c) 2014 Fractal contact@wearefractal.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


