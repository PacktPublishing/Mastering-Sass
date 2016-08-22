'use strict';

// Require in our plugins
var path        = require('path');
var gulp        = require('gulp');
var sass        = require('gulp-ruby-sass');
var sourcemaps  = require('gulp-sourcemaps');
var sync        = require('browser-sync').create();

// Define our paths for reuse throughout our tasks
var pathto = {
    'scss': path.join(__dirname, '/assets/scss'),
    'css' : path.join(__dirname, '/assets/css')
};

// Define glob patters for reuse in our tasks
var glob = {
    'sass': path.join(pathto.scss, '/**/*.{scss,sass}')
}

/**
 * Log to console for debugging
 */
gulp.task('log', () => {
    console.log(pathto.scss);
    console.log(pathto.css);
    console.log(glob.sass);
});

/**
 * Compile Sass to CSS
 */
gulp.task('sass:compile', () => {
    /**
     * Compil Sass and generate sourcemaps
     * @param  glob.sass    Glob pattern we defined above
     * @param  options for gulp-ruby-sass
     */
    return sass(glob.sass, {
        style: 'expanded',
        lineNumbers: true,
        sourcemap: true
    })
    // Generate sourcemaps using gulp-sourcemaps
    .pipe(sourcemaps.write('.'))
    // Output tot files in pathto.css
    .pipe(gulp.dest(pathto.css))
    // To use browser sync it needs to process the stream AFTER gulp.dest
    .pipe(sync.stream());
});

/**
 * Watch Sass files for changes and run sass:compile
 */
gulp.task('sass:watch', () => {
    // Use the glob.sass object we defined before.
    // When a file change is detected on any of those files
    // run sass:compile
    gulp.watch(glob.sass, ['sass:compile']);
});

// Creates a server at http://localhost:3000
gulp.task('serve', () => {
    // Set up the options for the server
    sync.init({
        server: {
            // set the root of your server relative to this file (gulpfile.js)
            baseDir: './'
        }
    });

    // Watch for changes and run any task we need
    gulp.watch(glob.sass, ['sass:compile']);
    // can also manually run reload on files that aren't
    // in a gulp stream.
    gulp.watch('./*.html').on('change', sync.reload);
});
