const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const gulpMocha = require('gulp-mocha');
const env = require('gulp-env');
const supertest = require('supertest');

gulp.task('default', () => {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 8000
    },
    ignore: ['./node_modules/**']
  })
  .on('restart', () => {
    console.log('restarting');
  });
});

gulp.task('test', () => {
  env({vars: { ENV: 'Test' }});
  gulp.src('tests/bookIntegrationTests.js', { read: false })
    .pipe(gulpMocha({ reporter: 'nyan' }));
});
