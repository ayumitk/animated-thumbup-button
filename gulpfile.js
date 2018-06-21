// Gulp
const gulp = require("gulp");

// Local server
const browserSync = require('browser-sync').create();

// CSS
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const csscomb = require('gulp-csscomb');
const sass = require('gulp-sass');


// --------------------------------------------------------------------
// Tasks
// --------------------------------------------------------------------

// Local Server
gulp.task('server', ['sass', 'html'], function () {

	browserSync.init({
		server: "./"
	});

	gulp.watch("src/scss/*.scss", ['sass']);
	gulp.watch("src/*.html", ['html']);
});

// Copy HTML
gulp.task('html', function () {
	gulp.src('./src/index.html')
		.pipe(gulp.dest('./'))

		.pipe(browserSync.reload({
			stream: true,
		}));
});

// Compile sass into CSS & Auto-inject into browsers
gulp.task('sass', function () {
	return gulp.src("src/scss/*.scss")

		.pipe(plumber({
			errorHandler: notify.onError("Error: <%= error.message %>")
		}))

		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))

		.pipe(csscomb())

		.pipe(sass({
			//outputStyle: 'compressed'
			outputStyle: 'expanded'
		}).on('error', sass.logError))

		.pipe(gulp.dest("./css"))

		.pipe(browserSync.reload({
			stream: true,
		}));
});

gulp.task('default', ['server']);