const express = require('express')
const pokemonrouter = require('./pokemons/router')
const pokemonrouterv2 = require('./pokemons/router_V2')
const app = express()

// MongoDB  -> document Based database
// Collection = table (in RDBMS)
// Document = Row (in RDBMS)
// Key = Column (in RDBMS)
// _id:ObjectID -> DocumentID

 //ลงทะเบียน middleware
app.use(express.json())
app.use(pokemonrouter)
app.use('/v2',pokemonrouterv2)
// Get http://localhost:3000/pokemons?name=Pikachu&type=Psysic
//QueryString   

// app.get('/pokemons',(req,res)=>{
//         let name = req.query.name
//         res.json({pokemon_name: name})
// })

// // Get http://localhost:3000/pokemon/999
// // Request Parameters
// app.get('/pokemon/:id',(req,res)=>{
//     let id = req.params.id
//     console.log(id)
//     res.json({pokemon_id: id })
// })

// app.post('/pokemons',(req,res)=>{
//         let p = req.body
//         console.log(p)
//         res.json(p)

// })

module.exports = app