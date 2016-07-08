var gulp = require('gulp');
var fs = require('fs');
var less = require('gulp-less');
var clean = require('gulp-clean');

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
        './src/public/html/index.html'
    ])
    .pipe(gulp.dest('dist/public'));
});

gulp.task('compile_js', function () {
    return gulp.src([
        './src/public/js/scripts.js'
    ])
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
    .pipe(gulp.dest('dist/public'));
});

gulp.task('build', [
    'clean',
    'compile_back_end',    
    'compile_less',
    'create_log_folder',
    'compile_js',  
    'compile_html'    
]);

