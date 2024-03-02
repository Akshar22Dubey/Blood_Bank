const express = require('express')
const { registerController, loginController, currentUserController } = require('../controllers/authController')
const router = express.Router()
const authMiddelware = require("../middlewares/authMiddelware")

//routes
// REGISTER || POST
router.post("/register",registerController)


//LOGIN || POST
router.get("/login",loginController);


//GET CURRENT USER || GET
router.get("/current-user", authMiddelware, currentUserController)

//export
module.exports=router