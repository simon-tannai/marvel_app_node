'use strict'

const gulp = require('gulp')
const minifyHtml = require('gulp-minify-html')
const minifier = require('gulp-uglify/minifier')
const strip = require('gulp-strip-comments')
const jsonminify = require('gulp-jsonminify')
const del = require('del')
const uglifyjs = require('uglify-js')
const pump = require('pump')
const minifyCss = require('gulp-minify-css')
const path = require('path')

/**
 * Name of production foler, who will contains production's sources
 * @type {String}
 */
const prodFolderName = 'prod'

/**
 * Delete the existing prod folder
 */
gulp.task('deleteExistingProdFolder', (cb) => {
  del(path.join(__dirname, prodFolderName)).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'))
    cb()
  })
})

/**
 * Minify JS files
 * The deleteExistingProdFolder task is require before this task.
 *
 * We get all JS file, except JS into node_modules and this file.
 * strip() will remove all comments.
 * minifier will minify JS files. We add into the second parameter uglifyjs, specifically
 * add from Harmony branch of UglifyJS project (see package.json).
 * Then, all minified JS files will be send into prod folder.
 */
gulp.task('js', ['deleteExistingProdFolder'], () => {
  return pump([
    gulp.src([
      path.join(__dirname, '**', '*.js'),
      '!' + path.join(__dirname, 'node_modules', '**', '*.*'),
      '!' + path.join(__dirname, 'test', '**', '*.*'),
      '!' + path.join(__dirname, 'gulpfile.js')
    ]),
    strip(),
    minifier(null, uglifyjs).on('error', (err) => {
      console.log(err)
    }),
    gulp.dest(path.join(__dirname, prodFolderName))
  ])
})

/**
 * Minify JSON files.
 * The deleteExistingProdFolder task is require before this task.
 */
gulp.task('json', ['deleteExistingProdFolder'], () => {
  return gulp.src([
    path.join(__dirname, '**', '*.json'),
    '!' + path.join(__dirname, 'node_modules', '**', '*.*')
  ])
  .pipe(jsonminify())
  .pipe(gulp.dest(path.join(__dirname, prodFolderName)))
})

/**
 * Minify HTML files.
 * The deleteExistingProdFolder task is require before this task.
 *
 * We does not use HTML files but EJS engine files.
 * This make not any problem :)
 */
gulp.task('html', ['deleteExistingProdFolder'], () => {
  return gulp.src(path.join(__dirname, 'views', '**', '*.ejs'))
    .pipe(minifyHtml())
    .pipe(gulp.dest(path.join(__dirname, prodFolderName, 'views')))
})

/**
 * Minify public JS files.
 * The deleteExistingProdFolder task is require before this task.
 *
 * Very similary than previous JS task.
 */
gulp.task('public:js', ['deleteExistingProdFolder'], () => {
  return pump([
    gulp.src(path.join(__dirname, 'public', 'js', '*.js')),
    strip(),
    minifier(null, uglifyjs),
    gulp.dest(path.join(__dirname, prodFolderName, 'public', 'js'))
  ])
})

/**
 * Minify CSS files.
 * The deleteExistingProdFolder task is require before this task.
 */
gulp.task('public:css', ['deleteExistingProdFolder'], () => {
  return gulp.src(path.join(__dirname, 'public', 'css', '*.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest(path.join(__dirname, prodFolderName, 'public', 'css')))
})
/**
 * Default task.
 * Will run when `gulp` command will used without parameter.
 */
gulp.task('default', ['deleteExistingProdFolder', 'js', 'json', 'html', 'public:js', 'public:css'])
