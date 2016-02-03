(function() {
  var express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path'),
      logger = require('morgan'),
      serveStatic = require('serve-static'),
      routes = require('./routes/'),

      app = express(),

      env = process.env.NODE_ENV || 'development';
      app.locals.ENV = env;
      app.locals.ENV_DEVELOPMENT = env == 'development';

      // express configuration
      app.use(logger('dev'));
      app.use(logger('dev'));
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({
        extended: true
      }));
      app.use(express.static(path.join(__dirname, 'public')));

      app.use('/', routes);

      app.use(function(req, res, next) {
          var err = new Error('Not Found');
          err.status = 404;
          next(err);
      });

      if (app.get('env') === 'development') {
          app.use(function(err, req, res, next) {
            res.status(err.status || 500).json({error: err, message: err.message});
          });
      }

      app.use(function(err, req, res, next) {
        res.status(err.status || 500).json({error: err.message});
      });

      // Serve static
      app.use(serveStatic('public'));

      module.exports = app;
}());
