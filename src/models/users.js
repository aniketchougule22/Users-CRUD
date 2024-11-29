const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email address'
        ],
    },

    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [
            /^\d{10}$/,
            'Phone number must be exactly 10 digits'
        ],
    },

    createdAt: {
        type: Date,
        default: new Date()
    },

    updatedAt: {
        type: Date,
        default: new Date()
    }
})

const users = mongoose.model("user",userSchema);

module.exports = { users }