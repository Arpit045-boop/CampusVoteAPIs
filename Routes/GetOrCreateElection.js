const express = require('express');

const router = express.Router();
const ElectionData = require("../models/ElectionData")

router.get("/getElectionData",async(req,res)=>{
    try{
        const ElectionDatalist = await ElectionData.find({});
        if(ElectionDatalist){
            res.send(ElectionDatalist)
        }
        else{
            res.status(404).json({message:"Error found"});
        }
    }
    catch(error){
        console.log("Error---",error);
    }
})

router.post("/createElection",async(req,res)=>{
    console.log(req.body.name);
    try{
       await ElectionData.create(
        {
            name: req.body.name,
            startdate:req.body.startdate,
            enddate: req.body.enddate,
            candidateId: req.body.candidateId 
        }
       )
       res.json({success:true}) 
    }
    catch(error){
        res.status(404).json({message:error});
        // console.log(error);
    }
})


router.patch('/updateElectionData',async(req,res)=>{
    // console.log(ElectionData);
    try{
        const filter = { name: req.body.electionName };
        const update = { $push:{candidateId: req.body.candidateId} };
        // console.log(ElectionData);

       ElectionData.updateOne(filter, update).then(
        (result)=>{
            res.send(result)
        }
       )
       
       
    }
    catch(error){
        console.log(error);
        res.status(404).json({message:error})
    }
})


module.exports = router