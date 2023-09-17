const express = require('express');
const Task = require('../models/TaskList')
const router = express.Router();
const User = require('../models/Users')


router.get("/getTask",async(req,res)=>{
    try{
        const Tasklist = await Task.find({});
        if(Tasklist){
            res.send(Tasklist)
        }
        else{
            res.status(404).json({message:"Error found"});
        }
    }
    catch(error){
        res.status(404).json({message:error});
    }
})

router.post("/createTask",async(req,res)=>{
    const UserObj = await  User.findOne({email: req.body.email});
    const VoterName = UserObj.name;
    const voterId = UserObj.voterId;
    // console.log(VoterName);
    try{
       await Task.create(
        {
            email: req.body.email,
            voterName: VoterName,
            voterId: voterId,
            createdAt: new Date().now,
            electionName: req.body.electionName
        }
       )
       res.json({success:true}) 
    }
    catch(error){
        res.status(404).json({message:error});
        console.log(error);
    }
})

router.delete("/deleteTask/:id", async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id)
      .then((deletedRow) => {
        if (!deletedRow) {
          return res.status(404).json({ error: "Row not found" });
        }else{
            return res.status(200).json({ message: "Row deleted successfully" });
        }
      })
      .catch((error) => {
        return res.status(404).json({ error: "Row not found" });
      });
  });



module.exports = router