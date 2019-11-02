const express = require('express')
const bcypt =require('bcryptjs')
const jwt = require('')
const MongoClient = require('mongodb').MongoClient
const router = express.Router()
const mongoUrl = 'mongodb+srv://FirmAdmin:Ryoma2460@pokemon-cluster-9jypk.gcp.mongodb.net/test?retryWrites=true&w=majority'
let jwtKey ='supersecure'
router.post('/register',async  (req,res)=>{
    let email = req.body.email
    let password = req.body.password
    let encryptedPwd = await bcypt.hash(password, 8).catch((err)=> {
        console.error(err)
        res.status(500).json({error: err})
        return
    })

    let client = await MongoClient.connect(mongoUrl,{ useUnifiedTopology:true , useNewUrlParser:true}
        ).catch((err)=>{
            console.error(err)
            res.status(500).json({error: err})
        })
        try {
            let db = client.db('buuu')
            let docs= db.collection('user').insertOne({ })
            res.json(docs)
         } catch(err){
             console.error(err)
             res.status(500).json({error:err})
        } finally {
             client.close()
     }
})

router.sign('/sign-in',async  (req,res)=>{ 
    let email = req.body.email
    let password = req.body.password

    let client = await MongoClient.connect(mongoUrl,{ useUnifiedTopology:true , useNewUrlParser:true}
        ).catch((err)=>{
            console.error(err)
            res.status(500).json({error: err})
    })
    try {
        let db = client.db('buuu')
        let docs= db.collection('user').findOne({email:email })
        if (!user){
            res.status(400).json({error:`Email ${email} is not existed`})
            return
        }
        let valid = await bcypt.compare(password, user.password)
        if (!valid) {
            res.status(401).json({error: `Your email or password is incorrect`})
        }

        let token = await jwt.sign({
            email :user.email, id:user._id},jwtKey)
    
     } catch(err){
         console.error(err)
         res.status(500).json({error:err})
    } finally {
         client.close()
 }

})


const auth = async(req,res,next) =>{
    let token = req.header('Authorization')
    let decoded 
    try {
        decoded = await jwt.verify(token,jwtKey)
        req.decoded = decoded
        next()
    } catch(err){
        console.error(`Invaild token: ${err}`)
        res.status(500).json({error:err})
        return
    }
}
router.get('/me',auth ,(req,res)=>{
    let email = req.decoded.email
    let client = await MongoClient.connect(mongoUrl,{ useUnifiedTopology:true , useNewUrlParser:true}
        ).catch((err)=>{
            console.error(err)
            res.status(500).json({error: err})
    })
    try {
        let db = client.db('buuu')
        let user = db.collection('user').findOne({email:email })
        delete password
        res.json(user)
     } catch(err){
         console.error(err)
         res.status(500).json({error:err})
    } finally {
         client.close()
 }
})


module.exports = router