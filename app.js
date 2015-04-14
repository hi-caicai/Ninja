/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , tcpp = require('tcp-ping')


var app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.render('index', {
    title : 'Home'
  })
})

app.get('/status', function (req, res) {
  tcpp.ping({
    address: req.query.url,
    attempts: 5,
    port: req.query.port,
    timeout: 2000
  }, function(err, data) {
    res.send({
      available: data.avg <= 6000,
      time: data.avg
    })
  })
})

app.get('/about', function (req, res) {
  res.render('about',
  { title : 'Home' }
  )
})

app.listen(1234)
