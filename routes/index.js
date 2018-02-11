var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

router.get('/chart', function(req, res){
  res.render('chart', {
    title: 'Chart'
  });
});

router.get('/contact', function(req, res){
  res.render('contact', {
    title: 'Contact'
  });
});

router.get('/login', function(req, res){
  res.render('login', {
    title: 'Login'
  });
});

module.exports = router;
