var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    _ = require('lodash');

/* GET home page. */
router.get('/v1/', function(req, res) {
  fs.readdir(__dirname + '/../public/img', function(err, files) {
    if (err) {
      console.error(err);
      throw new Error('Error reading directory!');
    }

    res.json({
      url: req.protocol + '://' + req.headers.host + '/img/' + _.sample(files)
    });

  });
});

module.exports = router;
