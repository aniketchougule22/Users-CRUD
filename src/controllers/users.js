const { sendResponse } = require("../helpers/responseHandler");
const { users } = require("../models/users")

const addUser = async (req, res) => {
    try {
        const newUser = await users.create(req.body);
        if (newUser._id) {
            sendResponse(res, 200, true, "user added succesfully")
        } else {
            sendResponse(res, 400, false, "user not added", [])
        }
    } catch (error) {
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map(err => err.message);
            return sendResponse(res, 400, false, "Validation error", errors);
        }
        if (error.code ===11000) {
            return sendResponse(res, 400, false, "duplicate email error",error.keyValue.email);
        }
        console.log(error)
        sendResponse(res, 500, false, "Internal server error")
    }
}

const getUser = async (req, res) => {
    try {
        const checkUser = await users.findOne({ _id: req.query.userId });
        if (checkUser) {
            sendResponse(res, 200, true, "user found succesfully", checkUser)
        } else {
            sendResponse(res, 400, false, "user not found", [])
        }
    } catch (error) {
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map(err => err.message);
            return sendResponse(res, 400, false, "Validation error", errors);
        }
        console.log(error)
        sendResponse(res, 500, false, "Internal server error")
    }
}

const updateUser = async (req, res) => {
    try {
        const checkUser = await users.findOneAndUpdate({ _id: req.query.userId }, { $set: req.body });
        if (checkUser) {
            sendResponse(res, 200, true, "user updated succesfully")
        } else {
            sendResponse(res, 400, false, "User not found", [])
        }
    } catch (error) {
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map(err => err.message);
            return sendResponse(res, 400, false, "Validation error", errors);
        }
        console.log(error)
        sendResponse(res, 500, false, "Internal server error")
    }
}

const deleteUser = async (req, res) => {
    try {
        const checkUser = await users.findOneAndDelete({ _id: req.query.userId });
        if (checkUser) {
            sendResponse(res, 200, true, "user deleted succesfully")
        } else {
            sendResponse(res, 400, false, "User not found", [])
        }
    } catch (error) {
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map(err => err.message);
            return sendResponse(res, 400, false, "Validation error", errors);
        }
        console.log(error)
        sendResponse(res, 500, false, "Internal server error")
    }
}

const getAllUsers = async (req, res) => {
    try {
        const { pageNo, limit } = req.query;
        const skip = (parseInt(pageNo) - 1) * limit;

        const checkAllUsers = await users.find().skip(skip).limit(Number(limit));
        const totalRecords = await users.countDocuments();
        if (checkAllUsers.length > 0) {
            sendResponse(res, 200, true, "users found succesfully", {
                pageNo: parseInt(pageNo),
                numberOfRecords: totalRecords,
                count: checkAllUsers.length,
                data: checkAllUsers
            })
        } else {
            sendResponse(res, 400, false, "users not found", [])
        }
    } catch (error) {
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map(err => err.message);
            return sendResponse(res, 400, false, "Validation error", errors);
        }
        console.log(error)
        sendResponse(res, 500, false, "Internal server error")
    }
}
module.exports = { 
    addUser, 
    getUser, 
    updateUser, 
    deleteUser, 
    getAllUsers 
}