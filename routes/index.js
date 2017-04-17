module.exports = function (app) {
  app.get('/', function(req, res) {
    res.redirect('/posts');
  });
  app.use('/signup', require('./signup'));
  app.use('/signin', require('./sigin'));
  app.use('/signout', require('./signout'));
  app.use('/posts', require('./posts'));
}