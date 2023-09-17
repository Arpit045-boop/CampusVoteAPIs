const express = require('express');

const router = express.Router();
const Post = require("../models/CandidatePost");
const fs = require('fs');

router.get('/getPost',async (req,res)=>{
    try{
        const PostList = await Post.find({});
        if(PostList){
            res.send(PostList)
        }
        else{
            res.status(404).json({message:"Error found"});
        }
    }
    catch(error){
        res.status(404).json({message:error});
    }
})


router.post("/createPost",async(req,res)=>{
    try{        
       await Post.create(
        {
           candidate: req.body.candidateName,
           partyName: req.body.partyName,
           slogan: req.body.slogan,
           email: req.body.email,
           desc: req.body.description,
           img:req.body.img.myFile
        }
       )
       res.status(201).json({ success: true });
    }
    catch(error){
        res.status(404).json({message:error});
        console.log(error);
    }
})


module.exports = router