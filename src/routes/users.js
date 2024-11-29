const express=require("express");
const { addUser, getUser, updateUser, deleteUser, getAllUsers } = require("../controllers/users");
const router=express.Router();

router.post("/",addUser)

router.get("/",getUser)

router.patch("/",updateUser)

router.delete("/",deleteUser)

router.get("/all",getAllUsers)


module.exports=router