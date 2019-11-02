const express = require('express')
const router = express.Router()

router.get('/pokemons',(req,res)=>{
    let v2 = 200
    res.json({pokemon_id: v2})
})


module.exports = router