const router = require('express').Router()
const authorization = require('../middleware/authorization.mid')
const User = require('../models/User.model')

/* GET default route */
router.get('/', authorization, (req, res, next) => {
  console.log('-->/')
  res.json({ success: true })
})

router.get('/getAll', (req,res,next)=>{
  const users = User.find()
  res.status(200).json(users)
} )

module.exports = router
