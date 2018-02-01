const gulp = require('gulp')
const sass = require('gulp-sass')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const sourcemaps = require('gulp-sourcemaps')
const htmlmin = require('gulp-htmlmin');
const postcss = require('gulp-postcss')
const browserSync = require('browser-sync').create()
const eslint = require('gulp-eslint')
const uglify = require('gulp-uglify')
const pump = require('pump')
const imagemin = require('gulp-imagemin')
const runSequence = require('run-sequence')
const lec = require('gulp-line-ending-corrector')

const project = {
  name: 'monsjovis',
  url: 'http://monsjovis.test',
  src: 'src',
  dev: '.dev',
  dist: 'dist'
}

gulp.task('browsersync', () => {
  browserSync.init({
    proxy: project.url,
    notify: false,
    open: true,
    injectChanges: true
  })
})

gulp.task('sass:development', (callback) => {
  const plugins = [
    require('pixrem')(),
    require('postcss-color-rgba-fallback')(),
    require('postcss-flexbugs-fixes')(),
    require('postcss-pseudoelements')(),
    require('autoprefixer')({
      browsers: ['last 4 versions']
    }),
    require('postcss-ordered-values')(),
    require('postcss-merge-longhand')(),
    require('postcss-merge-rules')(),
    require('postcss-discard-empty')(),
    require('perfectionist')()
  ]
  pump([
    gulp.src(project.src + '/sass/*.scss'),
    sourcemaps.init(),
    sass(),
    postcss(plugins),
    sourcemaps.write('.'),
    gulp.dest(project.dev + '/css/'),
    browserSync.stream({
      match: '**/*.css'
    })
  ], callback)
})

gulp.task('sass:production', (callback) => {
  const plugins = [
    require('pixrem')(),
    require('postcss-color-rgba-fallback')(),
    require('postcss-flexbugs-fixes')(),
    require('postcss-pseudoelements')(),
    require('autoprefixer')({
      browsers: ['last 4 versions']
    }),
    require('postcss-discard-comments')(),
    require('postcss-colormin')(),
    require('postcss-convert-values')(),
    require('postcss-ordered-values')(),
    require('postcss-minify-font-values')(),
    require('postcss-merge-longhand')(),
    require('postcss-merge-rules')(),
    require('postcss-discard-empty')(),
    require('perfectionist')({
      format: 'compressed'
    })
  ]
  pump([
      gulp.src(project.src + '/sass/*.scss'),
      sass(),
      postcss(plugins),
      gulp.dest(project.dist + '/css/')
    ],
    callback)
})

gulp.task('images:development', (callback) => {
  pump([
      gulp.src(project.src + '/images/**/*.{png,jpg,jpeg,gif,svg}'),
      imagemin([
        imagemin.gifsicle({
          interlaced: true
        }),
        imagemin.jpegtran({
          progressive: true
        }),
        imagemin.optipng({
          optimizationLevel: 5
        }),
        imagemin.svgo({
          plugins: [{
            removeViewBox: false
          }]
        })
      ]),
      gulp.dest(project.dev + '/images/')
    ],
    callback
  )
})

gulp.task('images:production', (callback) => {
  pump([
      gulp.src(project.src + '/images/**/*.{png,jpg,jpeg,gif,svg}'),
      imagemin([
        imagemin.gifsicle({
          interlaced: true
        }),
        imagemin.jpegtran({
          progressive: true
        }),
        imagemin.optipng({
          optimizationLevel: 5
        }),
        imagemin.svgo({
          plugins: [{
            removeViewBox: false
          }]
        })
      ]),
      gulp.dest(project.dist + '/images/')
    ],
    callback
  )
})

gulp.task('js:development', (callback) => {
  pump([
      gulp.src(project.src + '/js/scripts.js'),
      eslint(),
      eslint.format(),
      webpackStream({
        output: {
          filename: 'scripts.js'
        },
        module: {
          loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }],
        },
        plugins: [
          new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map'
          })
        ]
      }),
      gulp.dest(project.dev + '/js/'),
      browserSync.stream({
        match: '**/*.js'
      })
    ],
    callback
  )
})

gulp.task('html:development', (callback) => {
  pump([
      gulp.src(project.src + '/*.html'),
      htmlmin({
        collapseWhitespace: true
      }),
      gulp.dest(project.dev + '/')
    ],
    callback
  )
})

gulp.task('html:production', (callback) => {
  pump([
      gulp.src(project.src + '/*.html'),
      htmlmin({
        collapseWhitespace: true
      }),
      gulp.dest(project.dist + '/')
    ],
    callback
  )
})

gulp.task('copy:development', (callback) => {
  pump([
      gulp.src([project.src + '/*{.pdf,.webmanifest,.xml,.ico}', project.src + '/.htaccess']),
      gulp.dest(project.dev + '/')
    ],
    callback
  )
})

gulp.task('copy:production', (callback) => {
  pump([
      gulp.src([project.src + '/*{.pdf,.webmanifest,.xml,.ico}', project.src + '/.htaccess']),
      gulp.dest(project.dist + '/')
    ],
    callback
  )
})

gulp.task('js:production', (callback) => {
  pump([
      gulp.src(project.src + '/js/scripts.js'),
      eslint(),
      webpackStream({
        output: {
          filename: 'scripts.js'
        },
        module: {
          loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }],
        }
      }),
      uglify(),
      gulp.dest(project.dist + '/js/'),
    ],
    callback
  )
})

gulp.task('eolc', (callback) => {
  pump([
      gulp.src('./src/**/*.{scss,js,php,json}', { base: './' }),
      lec({
        eolc: 'LF',
        encoding:'utf8'
      }),
      gulp.dest('./'),
    ],
    callback
  )
})

gulp.task('watch', ['browsersync'], () => {
  gulp.watch(project.src + '/*.html', ['html:development', browserSync.reload])
  gulp.watch([project.src + '/*{.pdf,.webmanifest,.xml,.ico}', project.src + '/.htaccess'], ['copy:development', browserSync.reload])
  gulp.watch(project.src + '/sass/**/*.scss', ['sass:development'])
  gulp.watch(project.src + '/js/**/*.js', ['js:development'])
  gulp.watch(project.src + '/images/*.{png,jpg,jpeg,gif,svg}', ['images:development', browserSync.reload])
})

gulp.task('build', (callback) => {
  runSequence(
    ['sass:production', 'js:production', 'images:production', 'html:production', 'copy:production'],
    callback
  )
})

gulp.task('default', (callback) => {
  runSequence(
    ['sass:development', 'js:development', 'images:development', 'html:development', 'copy:development'],
    'watch',
    callback
  )
})