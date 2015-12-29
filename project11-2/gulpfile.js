var gulp = require('gulp'),
    connect = require('gulp-connect'), //创建服务器
    sass = require('gulp-sass'); //编译scss

/**
 * 编译sass
 */
gulp.task('sass', function() {
    return gulp.src('./src/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css/'));
});

/**
 * 监测scss文件改动
 */
gulp.task('sass:watch', function() {
    gulp.watch('src/sass/**/*.scss', ['sass'])
});

/**
 * 创建服务器
 */
gulp.task('connect', ['sass', 'sass:watch'], function() {
    connect.server({
        root: 'src', //访问build目录
    });
});

/**
 * 默认任务
 */
gulp.task('default', ['connect']);
