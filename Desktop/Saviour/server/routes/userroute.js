const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const Inventory = require("../models/inventoryModel");
const mongoose = require("mongoose");
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


        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
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
        //check if usertype matches
        if (userExists.userType !== req.body.userType) {
            return res.send({
                success: false,
                message: `User is not registered as a ${req.body.userType}`,
            });
        }
        //compare the password


        const validpass = await bcrypt.compare(req.body.password, userExists.password);
        if (!validpass) {
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

router.get("/get-current-user", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });


        return res.send({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,

        })
    }
});

//get-all unique donors
router.get("/get-all-donors", authMiddleware, async (req, res) => {
    try {
        const organization = new mongoose.Types.ObjectId(req.body.userId);
        //get all unique donor ids from inventory
    
    const uniqueDonorIds = await Inventory.distinct("donor",{organization,});
         
 const donors=await User.find({_id: {$in: uniqueDonorIds},});
return res.send({

    success: true,
    message: "All unique donors fetched successfully",
    data:  donors,
});
    } catch (error) {
    return res.send({
        success: false,
        message: error.message,

    });
}
});

router.get("/get-all-hospitals", authMiddleware, async (req, res) => {
    try {
        const organization = new mongoose.Types.ObjectId(req.body.userId);
        //get all unique donor ids from inventory
    
    const uniqueHospitalIds = await Inventory.distinct("hospital",{organization,});
         
 const hospitals=await User.find({_id: {$in: uniqueHospitalIds},});
return res.send({

    success: true,
    message: "Hospitals fetched successfully",
    data:  hospitals,
});
    } catch (error) {
    return res.send({
        success: false,
        message: error.message,

    });
}
});
module.exports = router;
