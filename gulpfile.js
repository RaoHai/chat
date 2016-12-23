var ghpages = require('gh-pages');
var gulp = require('gulp');
var path = require('path');

gulp.task('default', function() {
  ghpages.publish(path.join(__dirname, 'dist'));
});