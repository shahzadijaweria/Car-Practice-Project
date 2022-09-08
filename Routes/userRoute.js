require("dotenv").config()

const router = require("express").Router();
const loginRouter= require("../Controller/userController");
const authMiddleware = require("../MIddleware/authMiddleware");

router.post("/", loginRouter.login,authMiddleware.generateToken); 

router.post("/addUser", loginRouter.createUser); 


    module.exports = router;


