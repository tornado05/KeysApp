var gulp = require('gulp');
var fs = require('fs');
var less = require('gulp-less');
var clean = require('gulp-clean');
var fileinclude = require('gulp-file-include');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var connect = require('gulp-connect');

gulp.task('server', function () {
    connect.server({
        root: 'www',
        port: 8085
    });
});

gulp.task('watch', function () {
    gulp.watch('./src/**', ['build']);
});

gulp.task('clean', function () {
    return gulp.src('dist/*', {read: false}).pipe(clean());
});

gulp.task('copy_src_files', function () {
    return gulp.src([
        './src/*'
    ])
    .pipe(gulp.dest('dist'));
});

gulp.task('create_log_folder', function () {  
       return fs.mkdir('dist/logs', function (err) {
           
       });   
});

gulp.task('compile_html', function () {
    return gulp.src([
        './src/public/html/*.html'
    ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist/public'));
});

gulp.task('compile_js', function () {
    return gulp.src([
        './src/public/js/*.js'
    ])
    .pipe(uglify())
    .pipe(gulp.dest('dist/public'));
});

gulp.task('compile_back_end', function () {
    return gulp.src([
        './src/private/**'
    ])
    .pipe(gulp.dest('dist'));
});

gulp.task('compile_less', function () {
    gulp.src([
        'src/public/less/style.less'
    ])
    .pipe(less())
    .pipe(uglifycss({
      "maxLineLen": 2048,
      "uglyComments": true
    }))
    .pipe(gulp.dest('dist/public'));
});

gulp.task('deploy_data', function () {
    gulp.src([
            './data/*.json'
        ])
    .pipe(gulp.dest('dist/data'));
});

gulp.task('build', [
    //'clean',
    'compile_back_end',    
    'compile_less',
    'deploy_data',
    'create_log_folder',
    'compile_js',  
    'compile_html'
]);

gulp.task('default', ['build']);