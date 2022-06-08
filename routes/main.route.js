const route = require('express').Router()


route.get('/',(req,res,next)=>{
    try{
        const root = __dirname.replace('routes','')
        console.log('root', root)
        res.sendFile('views/cat/index.html',{root})
    }catch(e){
        next(e)
    }
})



module.exports=route