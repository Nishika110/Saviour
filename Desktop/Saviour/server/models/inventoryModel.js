const mongoose = require("mongoose");
const usersModel = require("./userModel");

const inventorySchema = new mongoose.Schema({

    //inventory type
    inventoryType: {
        type: String,
        required: true,
        enum: ["in", "out"],

    },

    bloodGroup: {
        type: String,
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique:false,
    },

    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organization",
        required: true,
    },
    //if inventory type out then hospital required else donor required
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: function () {
            if (this.inventoryType === 'out') {
                return true;
            }
            return false;
        },

    },
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users ",
        required: function () {
            if (this.inventoryType === 'in') {
                return true;
            }
            return false;
        },

    },

},
    {
        timestamps: true,
    });

const Inventory = mongoose.model("inventories", inventorySchema);
module.exports= Inventory;