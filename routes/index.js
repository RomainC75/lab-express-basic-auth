const router = require('express').Router()
const authorization = require('../middleware/authorization.mid')

/* GET default route */
router.get('/', authorization, (req, res, next) => {
  console.log('-->/')
  res.json({ success: true })
})

module.exports = router
