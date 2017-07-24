const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.sendStatus(200)
})

router.use(function(req, res, next) {
  const err = new Error('Page not found')
  err.status = 404
  next(err)
})

module.exports = router
