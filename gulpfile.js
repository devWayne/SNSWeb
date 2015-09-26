var gulp         = require('gulp');
var less         = require("gulp-less");
var postcss      = require('gulp-postcss');
var babel        = require('gulp-babel');
var rename       = require("gulp-rename");
var minifyCss    = require('gulp-minify-css');
var sourcemaps   = require('gulp-sourcemaps');
var concat	 = require('gulp-concat');

// var gulp = require('gulp');  
// var less = require('gulp-less');  
// var csso = require('gulp-csso');  
// var gutil = require('gulp-util');

// gulp.task('less', function() {  
//   return gulp.src('less/app.less')
//       .pipe(less())
//       .on('error', function(err) {
//         gutil.log('Less Error!', err.message);
//         this.end();
//       })
//       .pipe(csso())
//       .pipe(gulp.dest('./dist'))
// });

// gulp.task('watch', function() {  
//   gulp.watch('less/**/*.less', ['less']);
// });
// 以上用来处理错误，不会挂掉
var version = [
    "ie >=6",
    "chrome 20",    //taobao3
    "chrome 21",    //360
    "chrome 30",    //maxthon
    "chrome 31",    //sougou2
    "chrome 34",    //liebao
    "chrome 35",    //sougou2
    "last 3 firefox versions",
    "last 3 chrome versions",
    "last 2 safari versions",
];

var processors = [
    require('autoprefixer')({ browsers: version })
];

gulp.task('less', function() {
	
    return gulp.src('src/**/*.less')
	.pipe(less())        
	//.pipe(postcss(processors))
        .pipe(gulp.dest('public/'));
});

//es6 transform
gulp.task('babel', function() {
  return gulp.src('src/**/*.js')
    .pipe(rename(function(path) {
      path.extname = '.js';
    }))
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

gulp.task('public',function(){
  return gulp.src('build/**/*.css')
    .pipe(concat('style.css'))
    .pipe(sourcemaps.init())
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public'));
});

gulp.task('default', [
  'babel',
  'less',
  'public'
]);

gulp.watch('src/**/*.less', ['less','public']);

