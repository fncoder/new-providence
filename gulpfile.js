const gulp            = require('gulp');
const browserSync     = require('browser-sync').create();
const reload          = browserSync.reload;
const sass            = require('gulp-sass');
const autoprefixer    = require('gulp-autoprefixer');
const concat          = require('gulp-concat');
const cssmin          = require('gulp-cssmin');
const uglify          = require('gulp-uglify');
const babel           = require('gulp-babel');
const image           = require('gulp-image');
const rename          = require('gulp-rename');
const clean           = require('gulp-clean');

////Default
gulp.task('default', ['watch']);

////Server
gulp.task('server', ()=>{
    browserSync.init({
        server: {
            baseDir: "src"
        },
       browser: ["chrome"]
    });
});

////Compile SASS to CSS
gulp.task('sass', ()=>{
  return gulp.src(['src/sass/global.scss'])
    .pipe(concat('main.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('src/stylesheets'));
});

////Main CSS file to DIST
gulp.task('css-dist', ()=>{
  return gulp.src('src/stylesheets/main.css')
    .pipe(gulp.dest('build/stylesheets'))
    .pipe(concat('main.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssmin())
    .pipe(gulp.dest('build/stylesheets'))
});

////All CSS files to Dist
gulp.task('dist-styles', ()=>{
  return gulp.src(['src/stylesheets/*.css','!src/stylesheets/main.css'])
    .pipe(gulp.dest('build/stylesheets'));
});

////Clear CSS files
gulp.task('clean-css', ()=>{
  return gulp.src('build/stylesheets/*.css', {read: false})
    .pipe(clean());
});

////Bundle all JS files to DIST
gulp.task('js-dist', ()=>{
  return gulp.src(['src/js/*.js','!src/js/bundle.js'])
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('src/js'))
  .pipe(concat('bundle.js'))
  .pipe(babel())
  .pipe(gulp.dest('build/js'))
  .pipe(concat('bundle.js'))
  .pipe(rename({suffix: '.min'}))
  .pipe(babel())
  .pipe(uglify())
  .pipe(gulp.dest('build/js'))
});

////All JS files to Dist
gulp.task('dist-scripts', ()=>{
  return gulp.src(['src/js/*.js','!src/js/bundle.js'])
    .pipe(babel())
    .pipe(gulp.dest('build/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
});

////Compress images to DIST
gulp.task('imagemin', ()=>{
  gulp.src('src/images/**')
    .pipe(image())
    .pipe(gulp.dest('build/images'));
});

////Clear images files
gulp.task('clean-img', ()=>{
  return gulp.src('build/images/*', {read: false})
    .pipe(clean());
});

////All HTML files to DIST
gulp.task('htmls', ()=>{
return gulp.src('src/*.html')
    .pipe(gulp.dest('build'))
});

////Clear HTML files
gulp.task('clean-html', ()=>{
  return gulp.src('build/*.html', {read: false})
    .pipe(clean());
});

////Watch tasks
gulp.task('watch', ['server','sass','css-dist','dist-styles','js-dist','dist-scripts','imagemin','htmls'], ()=>{
  gulp.watch(['src/sass/global.scss', 'src/sass/base/**/*.scss', 'src/sass/components/**/*.scss', 'src/sass/helpers/**/*.scss', 'src/sass/layout/**/*.scss', 'src/sass/vendors/**/*.scss'], ['sass']);
  gulp.watch('src/stylesheets/*.css', ['css-dist','dist-styles','clean-css']).on('change', reload);
  gulp.watch('src/js/*.js', ['js-dist','dist-scripts']).on('change', reload);
  gulp.watch('src/images/*', ['imagemin','clean-img']);
  gulp.watch('src/*.html', ['htmls','clean-html']).on('change', reload);
});
