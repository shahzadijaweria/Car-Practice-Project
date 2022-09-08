require("dotenv").config();

const router = require("express").Router();
const createCarController = require("../Controller/carController");
const authMiddleware = require("../MIddleware/authMiddleware");


router.post("/add", authMiddleware.authenticateToken,createCarController.addCar); 

router.get("/", authMiddleware.authenticateToken,createCarController.getAllCars);


    module.exports = router;
