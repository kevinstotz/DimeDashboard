var path = require('path');
var express = require('express')
var app = express()
var router = express.Router();
var port = 10005

var config = require('./config')

app.use(express.static(__dirname + '/static')); 
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

router.get('/', function(req, res){
  console.log(req.url);
  res.render('index');
});

router.get('/charts', function(req, res){
  console.log(req.url);
  res.render('charts');
});

app.use('/', router);
console.log('> Starting dev server...')
app.listen(port, () => console.log('dev listening on port:!' + port));

