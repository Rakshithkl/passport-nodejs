var express = require('express');
var user = require('../models/user');

var router = express.Router();

router.post('/create',(req,res)=>{
    user.create(req.body,(err,data)=>{
        res.send(data)
    })
})
router.get('/findall',(req,res)=>{
    user.find((err,data)=>{
        res.send(data)
    })
})
router.get('/delete',(req,res)=>{
    user.findByIdAndRemove("5b2de90656fe5a09046af9f9",(err,data)=>{
        res.send(data)
    })
})
module.exports = router