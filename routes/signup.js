// 注册
var express = require('express');
var router = express.Router();

var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signup 注册
router.get('/signup', checkNotLogin, function(req, res, next) {
  res.send(req.flash());
});

// POST /signup 用户注册
router.post('/', checkNotLogin, function(req, res, next) {
  res.send(req.flash());
});

module.exports = router;
