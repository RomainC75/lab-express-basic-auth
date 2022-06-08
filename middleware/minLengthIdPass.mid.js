const router = require('express').Router()

router.use((req,res,next)=>{
    //console.log('--> minLengthPassword',req.body.password)
    if(req.body.username.length<6){
        res.status(400).json({
            message: "username length has to be greater than 5"
        })
        return
    }
    if(req.body.password.length<6){
        res.status(400).json({
            message:"password length has to be greater than 5"
        })
        return
    }
    next()
})

module.exports = router