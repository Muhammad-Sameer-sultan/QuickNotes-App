const express =require('express')
const Nodes =require("../Models/Nodes")
const router =express.Router();
var validator = require('validator');

router.get('/',(req,res)=>{
   console.log(req.body)
   const nodes = Nodes(req.body)
   nodes.save();
   res.send(req.body);
})

module.exports= router;