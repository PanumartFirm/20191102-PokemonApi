const express = require('express')
const MongoClient = require('mongodb').MongoClient
const router = express.Router()

const mongoUrl = 'mongodb+srv://FirmAdmin:Ryoma2460@pokemon-cluster-9jypk.gcp.mongodb.net/test?retryWrites=true&w=majority'

 // Get http://localhost:3000/pokemons?name=Pikachu&type=Psysic
 //QueryString   
 
 router.get('/pokemons',async (req,res)=>{
         let name = req.query.name

         let client = await MongoClient.connect(mongoUrl,
                { useNewUrlParser:true,useUnifiedTopology:true}
                ).catch((err)=>{
                        console.error(err)
                        res.status(500).json({error:err})
                  })
               
         try {
                let db = client.db('pokemon')
                let docs= db.collection('pokemons').find({}).toArray()
                res.json(docs)
         } catch(err){
                 console.error(err)
                 res.status(500).json({error:err})
         } finally {
                 client.close()
         }

 })
 
 // Get http://localhost:3000/pokemon/999
 // Request Parameters
 router.get('/pokemon/:id',(req,res)=>{
     let id = req.params.id
     console.log(id)
     res.json({pokemon_id: id })
 })
 
 router.post('/pokemons',(req,res)=>{
         let p = req.body
         console.log(p)
         res.json(p)
 
 })

 module.exports = router