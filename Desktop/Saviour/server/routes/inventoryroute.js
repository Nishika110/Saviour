const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
const Inventory = require("../models/inventoryModel");
const authMiddleware = require("../middlewares/authMiddleware")
const mongoose = require("mongoose");

//add inventory
router.post("/add", authMiddleware, async (req, res) => {
    try {
        //validate email and inventory type





        const userExists = await User.findOne({
            email: req.body.email
        })
        if (!userExists) {
            return res.send({
                success: false,
                message: "Invalid Email",
            });
        }
        if (req.body.inventoryType === "in" && userExists.userType !== "donor") {
            throw new Error("Email not registered as a donor");
        }
        if (req.body.inventoryType === "out" && userExists.userType !== "hospital") {
            throw new Error("Email not registered as a hospital");
        }

        //create inventory
        if (req.body.inventoryType === "out") {
            //check if inventory available
            const requestedGroup = req.body.bloodGroup;
            const requestedQuantity = req.body.quantity;
            const organization = new mongoose.Types.ObjectId(req.body.userId);

            const amount = await Inventory.aggregate([
                {
                    $match: {
                        organization,
                        inventoryType: "in",
                        bloodGroup: requestedGroup,

                    },
                },
                {
                    $group: {
                        _id: "$bloodGroup",
                        total: { $sum: "$quantity" },
                    },
                },
            ]);

            const totalIn = amount[0].total || 0;

            const outamount = await Inventory.aggregate([
                {
                    $match: {
                        organization,
                        inventoryType: "out",
                        bloodGroup: requestedGroup,

                    },
                },
                {
                    $group: {
                        _id: "$bloodGroup",
                        total: { $sum: "$quantity" },
                    },
                },
            ]);
            const totalOut = outamount[0]?.total || 0;

            const available=totalIn-totalOut;
            if(available<requestedQuantity){
                throw new Error (`Only ${available} units of ${requestedGroup.toUpperCase()} is available`);
            }
            req.body.hospital = userExists._id;
        }
        else { req.body.donor = userExists._id }

        const inventory = new Inventory(req.body);
        await inventory.save();
      
        return res.send({

            success: true,
            message: "Inventory Added Successfully"
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

//get inventory
router.get("/get", authMiddleware, async (req, res) => {
    try {
        //validate email and inventory type
        const inventory = await Inventory.find({ organization: req.body.userId }).sort({createdAt:-1});
        return res.send({ success: true, data: inventory });

    }
    catch (error) {
        console.log(error);
        return res.send({
            success: false,
            message: error.message,
        })
    }
});

router.post("/filter", authMiddleware, async (req, res) => {
    try {
        //validate email and inventory type
        
        const inventory = await Inventory.find(  req.body.filters ).sort({createdAt:-1}).populate("organization")//.populate("donor").populate("hospital");
        return res.send({ success: true, data: inventory });

    }
    catch (error) {
        console.log(error);
        return res.send({
            success: false,
            message: error.message,
        })
    }
});


module.exports = router;