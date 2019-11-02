const express = require('express')
const router = express.Router()


 // Get http://localhost:3000/pokemons?name=Pikachu&type=Psysic
 //QueryString   
 
 router.get('/pokemons',(req,res)=>{
         let name = req.query.name
         res.json({pokemon_name: name})
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