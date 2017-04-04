var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var mocha = require('gulp-mocha');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var cp = require('child_process');
var tsb = require('gulp-tsb');
var del = require('del');

// Clean build folder
gulp.task('clean', function () {
    del.sync("./out", {force: true});
});

// compile less files from the ./styles folder
// into css files to the ./public/stylesheets folder
// gulp.task('less', function () {
//     return gulp.src('./src/styles/**/*.less')
//         .pipe(less({
//             paths: [path.join(__dirname, 'less', 'includes')]
//         }))
//         .pipe(gulp.dest('./out/public/stylesheets'));
// });


// run mocha tests in the ./tests folder
// gulp.task('test', function () {
//     return gulp.src('./tests/out/test*.js', { read: false })
//     // gulp-mocha needs filepaths so you can't have any plugins before it 
//         .pipe(mocha());
// });

// run browser-sync on for client changes
gulp.task('browser-sync', ['nodemon', 'watch'], function () {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["out/**/*.*", "out/routes/**/*.*", "out/public/**/*.*", "out/views/**/*.*"],
        port: 7000,
    });
});

// run nodemon on server file changes
gulp.task('nodemon', ['buildserver', 'buildclient', 'staticclient'], function (cb) {
    var started = false;

    return nodemon({
        script: './out/server/www.js',
        watch: ['./out/server/*.js']
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    }).on('restart', function onRestart() {
        setTimeout(function reload() {
            browserSync.reload({
                stream: false
            });
        }, 500);  // browserSync reload delay
    });
});

gulp.task('build', ['buildserver', 'buildclient'])

// TypeScript build for /src folder 
var tsConfigSrc = tsb.create('./server/tsconfig.json');
gulp.task('buildserver', function () {
    return gulp.src('./server/**/*.ts')
        .pipe(tsConfigSrc())
        .pipe(gulp.dest('./out'));
});
var tsConfigClientSrc = tsb.create('./client/tsconfig.json');
gulp.task('buildclient', function () {
    return gulp.src('./client/**/*.ts')
        .pipe(tsConfigClientSrc())
        .pipe(gulp.dest('./out/client'));
});


gulp.task('staticclient', [], function () {
    gulp.src(['./client/**/*.html']) // , '!./app/bower_components/**/*'
        .pipe(gulp.dest('./out/client'))
        .pipe(browserSync.stream());
    gulp.src(['./client/**/*.css'])
        .pipe(gulp.dest('./out/client'))
        .pipe(browserSync.stream());
    gulp.src(['./client/**/*.js'])
        .pipe(gulp.dest('./out/client'))
        .pipe(browserSync.stream());    
});


// watch for any TypeScript or LESS file changes
// if a file change is detected, run the TypeScript or LESS compile gulp tasks
gulp.task('watch', function () {
    gulp.watch('client/**/*.ts', ['buildclient']);
    gulp.watch('server/**/*.ts', ['buildserver']);
    gulp.watch('client/**/*.html', ['staticclient']);
    gulp.watch('client/**/*.css', ['staticclient']);
    gulp.watch('client/**/*.less', ['less']);
});

gulp.task('buildAll', ['build', 'less']);
gulp.task('default', ['browser-sync']);
