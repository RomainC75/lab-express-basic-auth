const User = require('../models/User.model')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()

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
    //empty field error
    if(Object.values(req.body).includes('')){
        console.log('ERROR ! empty field !')
        res.status(400).json({
            message : "empty field error"
        })
    }
    if(req.body.username===req.body.password){
        res.status(400).json({
            message : "username cannot be repeated"
        })
    }
    try{
        const { username, password } = req.body
        console.log(req.body)
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
        //send the JWT
        const payload = {
            _id:foundUser._id,
            username:foundUser.username
        }
        console.log('payload',payload)
        const authToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            {algorithm:'HS256', expiresIn: '1h'}
        )
        res.status(200).json({authToken})
    }catch(e){
        next(e)
    }
})

router.get('/verify',(req,res,next)=>{
    const token = req.headers.authorization.replace('Bearer ', '')
    try{
        const tokenVerified = jwt.verify(token, process.env.TOKEN_SECRET)
        res.status(200).json({message: 'token ok ! ',tokenVerified})

    }catch(e){
        console.log('error : ',e)
        res.status(400).json(e)
    }
})

module.exports = router