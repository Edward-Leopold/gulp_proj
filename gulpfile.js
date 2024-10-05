const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const htmlmin = require('gulp-htmlmin');

async function compilescss( ){
    gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./build/css'))
}

async function minifyhtml() {
    return gulp.src('./src/index.html')
      .pipe(htmlmin({ collapseWhitespace: true })) 
      .pipe(gulp.dest('./build')); 
  }

async function html(){
    return gulp.src('./src/index.html')
      .pipe(gulp.dest('./build')); 
}

gulp.task('watch',function(){
    gulp.watch('./src/scss/*.scss', compilescss)
});

exports.build = gulp.series(gulp.parallel(compilescss, html))

if (process.env.NODE_ENV === 'production') {
    exports.build = gulp.parallel(compilescss, minifyhtml)
  } else {
    exports.build = gulp.parallel(compilescss, html)
  }