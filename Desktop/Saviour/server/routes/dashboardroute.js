const express = require('express');
const router = express.Router();
const Inventory = require("../models/inventoryModel");
const authMiddleware = require("../middlewares/authMiddleware")
const mongoose = require("mongoose");


//get all bloodGroups in, out , available data from inventory collecion
router.get("/blood-groups-data", authMiddleware, async (req, res) => {
    try {
        //validate email and inventory type
        const allBloodGroups=["a+","a-","b+","b-","ab+","ab-","o+","o-"];
        const organization=new mongoose.Types.ObjectId(req.body.userId);
        const bloodGroupsData=[];
        await Promise.all(allBloodGroups.map(async(bloodGroup)=>{const totalIn=await Inventory.aggregate([
            {$match:{
                bloodGroup:bloodGroup,
                inventoryType:"in",
                organization


            },},
            {$group:{
               _id:null,
               total:{
                $sum:"$quantity",
               },
            
            },},

        ]);
        const totalOut=await Inventory.aggregate([
            {$match:{
                bloodGroup:bloodGroup,
                inventoryType:"out",
                organization,

            },},
            {$group:{
               _id:null,
               total:{
                $sum:"$quantity",
               },
            
            },},

        ]);
        const available=(totalIn[0]?.total||0)-(totalOut[0]?.total||0);
        bloodGroupsData.push({
            bloodGroup,
            totalIn: totalIn[0]?.total||0,
            totalOut: totalOut[0]?.total||0,
            available,
        });
    }));
        res.send({ success: true, message: "Blood Group Data", data: bloodGroupsData });

    }
    catch (error) {
       
        return res.send({
            success: false,
            message: error.message,
        })
    }
});
module.exports=router;