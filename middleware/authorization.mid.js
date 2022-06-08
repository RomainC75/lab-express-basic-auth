const router = require('express').Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.use((req,res,next)=>{
    try{
        const token = req.headers.authorization.replace('Bearer ','')
        console.log('authorization : ',token)
        const verifReturn = jwt.verify(token,process.env.TOKEN_SECRET)
        console.log('verifReturn',verifReturn)
        req.user = {
            _id:verifReturn._id,
            username:verifReturn.username
        }
        next()
    }catch(e){
        res.status(402).json({message : 'not authorizated'})
    }
})

module.exports = router