const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: true,
        enum: ["donor", "organization ", "hospital", "admin"],

    },
    //donor or admin
    name: {
        type: String,
        required: function () {
            if (this.userType === 'admin' || this.userType === 'donor') {
                return true;
            }
            return false;
        },
    },
    //hospital name
    hospitalName: {
        type: String,
        required: function () {
            if (this.userType === 'hospital') {
                return true;
            }
            return false;
        },
    },
    organizationName: {
        type: String,
        required: function () {
            if (this.userType === 'organization') {
                return true;
            }
            return false;
        },
    },
    website: {
        type: String,
        required: function () {
            if (this.userType === 'organization' || this.userType === 'hospital') {
                return true;
            }
            return false;
        },

    },
    address: {
        type: String,
        required: function () {
            if (this.userType === 'organization' || this.userType === 'hospital') {
                return true;
            }
            return false;
        },

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,

    }
},
    {
        timestamps: true,
    });
    userSchema.plugin(uniqueValidator);
    const Users = mongoose.model("users", userSchema);
    module.exports= Users;
// module.exports = mongoose.model('users', UserSchema);