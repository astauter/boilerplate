const path = require('path');
const morgan = require('morgan')
const Express = require('express');
const bodyParser = require('body-parser')


let app = Express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(Express.static(path.join(__dirname, '../public')));

app.use(require('./authMiddleware'))

app.use('/api', require('./api'))

app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public'))
})

app.use(function (err, req, res, next){
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'internal server error')
})

app.listen(1337, function (req, res, next) {
  console.log('Listening on 1337')
})
