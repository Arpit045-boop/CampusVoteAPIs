const express = require('express');

const router = express.Router();

router.get("/getVoterData",async(req,res)=>{
    try{
        res.send(VoterData);
    }
    catch(error){
        res.status(404).json({message:error})
    }
    
})


router.post("/createVoter",async(req,res)=>{
    try{
       await fetched_voter_data.insertOne(
        {
           voterName: req.body.userName,
        //    electionId: electionId,
           voterId:req.body.voterId
        }
       )
       res.json({success:true}) 
    }
    catch(error){
        res.status(404).json({message:error});
        console.log(error);
    }
})


module.exports = router;