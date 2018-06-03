const gulp = require('gulp')
const bs = require('browser-sync').create()
const reload = bs.reload

gulp.task('webpack', () => {
  const webpack = require('webpack-stream')
  const config = require('./webpack.config.js')
  gulp.src('./js/**/*.js')
    .pipe(webpack(config))
    .pipe(gulp.dest('../www/js'))
    .pipe(reload({ stream: true })) // 加上这句后执行任何完成后才会自动刷新页面
})

gulp.task('less', () => {
  const less = require('gulp-less')
  gulp.src('./less/*.less')
    .pipe(less())
    .pipe(gulp.dest('../www/css'))
    .pipe(reload({ stream: true }))
})
gulp.task('serve', ['less', 'webpack'], () => {
  bs.init({
    server: {
      baseDir: '../www/'
    },
    port: 8000
  })
  gulp.watch('./less/*.less', ['less'])
  gulp.watch('./js/*/*.js', ['webpack'])
  gulp.watch('../www/*').on('change', reload)
})
gulp.task('default', ['serve'])
