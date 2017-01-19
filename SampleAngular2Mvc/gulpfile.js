/// <binding BeforeBuild='dist-libs' AfterBuild='build' Clean='clean-libs' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var ts = require('gulp-typescript');
var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-sass');

/// RUN, DEPLOY tasks
gulp.task('default', ['build', 'dist-libs', 'watch']);

gulp.task('clean-libs', function () {
    return gulp.src('./dist/libs')
        .pipe(clean());
});

gulp.task("dist-libs", () => {
    gulp.src([
            'core-js/client/**',
            'systemjs/dist/system.src.js',
            'reflect-metadata/**',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**',
            'jquery/dist/jquery.*js'
    ], {
        cwd: "node_modules/**"
    })
        .pipe(gulp.dest('./dist/libs'));
});

var tsProject = ts.createProject('app/tsconfig.json', {
    typescript: require('typescript')
});

/// BUILD tasks
gulp.task('build-ts', function (done) {
    //var tsResult = tsProject.src()
    var tsResult = gulp.src([
            "./app/**/*.ts",
            "!./app/**/_*.ts"
    ])
        .pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
    return tsResult.js.pipe(gulp.dest('./dist/js/'));
});
gulp.task('build-sass', function () {
    gulp.src([
        './app/**/*.scss',
        '!./app/**/_*.scss'
    ])
        .pipe(sass())
        .pipe(gulp.dest('./dist/css/'))
});
gulp.task('build-html', function () {
    gulp.src("./app/**/*.html")
        .pipe(gulp.dest('./dist/js/'))
});
gulp.task('build', ['build-ts', 'build-html', 'build-sass']);

/// WATCH tasks
gulp.task('watch-sass', function () {
    gulp.watch('./app/**/*.scss', ['build-sass'])
});
gulp.task('watch-ts', ['build-ts'], function () {
    return gulp.watch('app/**/*.ts', ['build-ts']);
});
gulp.task('watch', ['watch-ts', 'watch-sass']);
