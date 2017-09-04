var gulp = require('gulp')
var sass = require('gulp-sass')
var browsersync = require('browser-sync').create()
var reload = browsersync.reload
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('default', function () {
    
})

gulp.task('scss', function () {
    
    var processors = [
        autoprefixer({ browsers: ['last 2 versions']}),
    ];
    
    return gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browsersync.reload({
        stream:true
    }))
})

gulp.task('browser-sync', function () {
    browsersync.init({
        server: {
            baseDir: ["./", "./dist"]
        }
    })
})

gulp.task('watch', ['browser-sync', 'scss'], function () {
    gulp.watch('./scss/*/*.scss', ['scss'])
    gulp.watch('./scss/*.scss', ['scss'])
    gulp.watch('./dist/*.html').on('change', reload)
    gulp.watch('./src/*.js').on('change', reload)
})