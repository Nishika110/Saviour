const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt=require("jsonwebtoken");
const authMiddleware=require("../middlewares/authMiddleware")
//register new user
router.post("/register", async (req, res) => {
    try {
        //check already existing user
        console.log("Password received in the request:", req.body.password);
        const userExists = await User.findOne({
            email: req.body.email
        });
        if (userExists) {
            return res.send({
                success: false,
                message: "User already exists",
            });
        }
        //hash the password
        const salt = await bcrypt.genSalt(10);
      
       
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password= hashedPassword;
        //save user
        const user = new User(req.body);
        await user.save();

        return res.send({
            success: true,
            message: "User Registration Successfull",
        });
    }
    catch (error) {
        console.log(error);
        return res.send({
            success: false,
            message: error.message,
          
        })
    }
});

router.post("/login", async (req, res) => {
    try {
        //check already existing user
        const userExists = await User.findOne({
            email: req.body.email
        });
        if (!userExists) {
            return res.send({
                success: false,
                message: "User does not exist",
            });
        }
        //compare the password
        
      
        const validpass = await bcrypt.compare(req.body.password, userExists.password);
        if(!validpass){
            return res.send({
                success: false,
                message: "Invalid password",
            }); 
        }
        //generate token
        const token = jwt.sign({ userId: userExists._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        

        
        return res.send({
            success: true,
            message: " Login Successfull",
            data: token,
        });
    }
    catch (error) {
        console.log(error);
        return res.send({
            success: false,
            message: error.message,
            
        })
    }
});

router.get("/get-current-user", authMiddleware, async(req,res)=>{
    try{
      const user=await User.findOne({_id:req.body.userId});   
    
      
      return res.send({
        success:true,
        message:"User fetched successfully",
        data:user,
      });
    }catch(error){
        return res.send({
            success:false,
            message: error.message,

        })
    }
})
module.exports=router;
