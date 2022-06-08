const router = require('express').Router()
const auth = require('../middleware/authorization.mid')

router.get('/', auth, (req,res,next)=>{
    console.log('inside private : ',req.user)
    const root = __dirname.replace('routes','')
    res.sendFile('views/private/index.html',{root})
})

module.exports=router