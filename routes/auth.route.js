const User = require('../models/User.model')
const bcrypt = require('bcrypt')
const router = require('express').Router()


router.get('/signup',(req,res,next)=>{
    try{
        const root = __dirname.replace('routes','')
        console.log(root)
        res.sendFile('views/auth/index.html', {root})
    }catch(e){
        next(e)
    }
})

router.post('/signup', async (req,res,next)=>{
    try{
        const { username, password } = req.body
        const recordedUser = await User.findOne({ username })
        if(recordedUser!==null){
            res.status(303).json({message:"user already used. Try another one !"})
            return
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPsw = await bcrypt.hash(password,salt)
        const ans = await User.create({username,password:hashedPsw})
        res.status(201).json({username:ans.username})
    }catch(e){
        next(e)
    }
})

router.post('/signin', async(req,res,next)=>{
    try{
        const {username,password} = req.body
        const foundUser = await User.findOne({username})
        if(foundUser===null){
            res.status(401).json({message:"wrong username !"})
            return
        }
        const isPswdMatched = await bcrypt.compare(password,foundUser.password)
        if(!isPswdMatched){
            res.status(401).json({message:"wrong password !"})
            return
        }
        res.status(200).json({message: "authenticated !"})
    }catch(e){
        next(e)
    }
})


module.exports = router