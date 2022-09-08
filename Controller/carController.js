const Car = require('../Model/Cars');

addCar  = async (req,res) => {
    const carName = req.body.carName;
    const model = req.body.model;
    const color = req.body.color;

    try{
        const newCar = new Car({
            userID : req.user.userId,
            carName: carName,
            model: model,
            color: color,
            purchaseDate: new Date()

        }) 
    
          console.log(newCar);
          await newCar.save();  
        res.status(200).send("Car added " + JSON.stringify(newCar));

    }
    catch (err){
        res.status(400).send(err);

    }
}

getAllCars = async (req,res) => {
    try{       
        const userId = req.user.userId;  
        console.log("userid: " + userId);         
        // get id of logged in user
        const cars = await Car.find({userID: userId});
        console.log(JSON.stringify(cars));
        console.log(cars.length);

        if (cars.length == 0 )
        return res.status(404).send(`No cars belong to userId ${userId} found...`); 
        else
        return res.status(200).send(`Cars belong to userId ${userId} are: `+ JSON.stringify(cars))
}

    catch (err){
        console.log("catch block of carController ");

        return res.status(400).json({ status: 400, message: err.message });
    }

}

module.exports = {
    addCar,
    getAllCars
}