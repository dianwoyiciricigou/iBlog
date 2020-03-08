const express = require('express')

const admin = express.Router()

admin.get('/user',(req,res)=>{
    const query = req.query;
    res.send(query)
})

module.exports = admin