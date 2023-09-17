const express = require('express');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require("../models/Users");
const Admin = require("../models/AdminData");

const jsonwebtoken = require('jsonwebtoken');
const bcryptjs = require('bcrypt');
const dotenv = require("dotenv");

dotenv.config();


const jwtSecret = process.env.SECRET_KEY  ;

router.get("/getUserData",async(req,res)=>{
    try{
        const isVoter = req.query.isVoter;
        const isCandidate = req.query.isCandidate;
        const userData = await User.find({});
        if(userData){
            res.send(userData);
        }
        else{
            res.status(404).json({message:"Error found"});
        }
        
    }
    catch(error){
        res.status(404).json({message:error});
    }
    

})

router.post("/createUser",[
    body('email').isEmail(),
    body('password').isLength({min:5}),
    body('dateOfBirth').isISO8601()
],
    async (req,res)=>{
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()});
        }
        // Validate age
        const dateOfBirth =  new Date(req.body.dateOfBirth);
        const currentDate = new Date();
        const userAge = currentDate.getFullYear() - dateOfBirth.getFullYear();
        const isUserAbove18 = currentDate.getMonth() >= dateOfBirth.getMonth() && currentDate.getDate() >= dateOfBirth.getDate();

        if(userAge < 18 || (!isUserAbove18 && userAge === 18)){
            return res.status(400).json({error:"Your age is not above 18"});
        }        

        const salt = await bcryptjs.genSalt(10);
        const secPassword = await bcryptjs.hash(req.body.password,salt);
        try{
            await User.create(
                {
                    voterId:req.body.voterId,
                    email: req.body.email,
                    name: req.body.name,
                    dateOfBirth: req.body.dateOfBirth,
                    password : secPassword,
                    isVoter : req.body.isVoter,
                    createdAt: new Date().now,
                    isCandidate:false
                }
            )
            res.json({success:true})
        }
        catch(error){
            console.log(error);
            res.send({success:false});
        }
    })

router.post("/loginUser",[
    body('email').isEmail(),
    body('password').isLength({min:5})
    ],
    async (req,res)=>{
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()});
        }
        
        let email = req.body.email;
        try{
            const userData = await User.findOne({email});
            if(!userData){
                return res.status(400).json({error:"Please check your credential"});
            }

            const passCompare = await bcryptjs.compare(req.body.password , userData.password);
            if(!passCompare){
                return res.status(400).json({error:"Please check your credential"});
            }

            
            const data = {
                user:{
                    id:userData.id
                }
            }

            const authToken = jsonwebtoken.sign(data,jwtSecret)
            
            return res.send({success:true,authToken:authToken})

        }
        catch(error){
            console.log(error);
            res.json({success:false})
        }
    }

    )

router.post("/loginAdmin",[
    body('email').isEmail(),
    body('password').isLength({min:5})
    ],
    async (req,res)=>{
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()});
        }
        let arr=[];
        let userData = {};
        // let email = req.body.email;
        try{
            const adminObj =await Admin.findOne({email: req.body.email});
            console.log(adminObj);
            if(adminObj){
                console.log("Correct Email");
            }
            else{
                return res.status(400).json({error:"Please check credentials"});
            }
            if(! (adminObj.password === req.body.password)){
                
                return res.status(400).json({error:"Please check credentials"});
            }
            const data = {
                Admin:{
                    id:Admin._id
                }
            }
            const authToken = jsonwebtoken.sign(data,jwtSecret)
            // console.log(authToken);
            return res.send({success:true})
            
            

        }
        catch(error){
            console.log(error);
            res.json({success:false})
        }
    }

    )
    
router.patch('/updateUser',async(req,res)=>{
    try{
        // const isCandidate = true;
        User.findOneAndUpdate(
            {name: req.body.name},
            {isCandidate: true},
        ).then(
            (result)=>{
                res.json(result)
            }
        )
    }
    catch(error){
        res.status(404).json({message:error})
    }
})
module.exports = router