var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('posts');

module.exports = function (app) {
  app.use('/api', router);
};

router.get('/main', function (req, res, next) {
    res.render('main');
});
