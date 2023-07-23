const router = require("expres").Router();
const bcrypt = require("bcrypt.js");
const User = require("../models/userModel");
const wt=require("jsonwebtoken");
//register new user
router.post("/register", async (req, res) => {
    try {
        //check already existing user
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
        const hashedpass = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedpass;
        //save user
        const user = new User(req.body);
        await user.save();

        return res.send({
            success: true,
            message: "User Registration Successfull",
        });
    }
    catch (error) {
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
        const salt = await bcrypt.genSalt(10);
        const validpass = await bcrypt.compare(req.body.password, user.password);
        if(!validpass){
            return res.send({
                success: false,
                message: "Invalid password",
            }); 
        }
        //generate token
       const token=jwt.sign({
        userId:user._id},
        process.env.JWT_SECRET,
        {expiredIN:'1d'})
        

        
        return res.send({
            success: true,
            message: " Login Successfull",
            data: token,
        });
    }
    catch (error) {
        return res.send({
            success: false,
            message: error.message,
            
        })
    }
});

module.exports=router;
