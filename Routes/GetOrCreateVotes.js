const express = require('express');

const router = express.Router();
const VoteData = require("../models/VoteData")


router.get('/getVotes',async (req,res)=>{
    try{
        // VotesData
        const Votes = await VoteData.find({});
        if(Votes){
            res.send(Votes)
        }
        else{
            res.status(404).json({message:"Error found"});
        }
    }
    catch(error){
        res.status(404).json({message:error});
    }
    
})


router.post("/createVotes",async(req,res)=>{
    try{
       await VoteData.create(
        {
        //    voter: req.body.voterName,
           candidate: req.body.candidateName,
           position: req.body.electionName,
           voterName: req.body.voterName 
        }
       )
       res.json({success:true}) 
    }
    catch(error){
        res.status(404).json({message:error});
        console.log(error);
    }
})


module.exports = router