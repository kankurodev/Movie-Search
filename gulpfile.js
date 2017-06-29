var gulp = require('gulp')
var sass = require('gulp-sass')
var browsersync = require('browser-sync').create()
var reload = browsersync.reload

gulp.task('default', function () {
    
})

gulp.task('scss', function () {
    return gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'))
    .pipe(browsersync.reload({
        stream:true
    }))
})

gulp.task('browser-sync', function () {
    browsersync.init({
        server: {
            baseDir: './'
        }
    })
})

gulp.task('watch', ['browser-sync', 'scss'], function () {
    gulp.watch('./scss/*/*.scss', ['scss'])
    gulp.watch('./scss/*.scss', ['scss'])
    gulp.watch('*.html').on('change', reload)
})