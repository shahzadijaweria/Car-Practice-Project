const express = require ("express");
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://shahzadi:1234@cluster0.thdvy2l.mongodb.net/carProject');

app.use(express.json()); // enable parsing of JS objects in the body

const user = require('./Routes/userRoute');
const car = require ('./Routes/carRoute');

app.use('/signUp',user);
app.use('/addCar',car);
app.use('/getAllCars',car);
app.use('/login',user);



const port = process.env.Port || 3000;

app.listen(port);
console.log(   `listening to ${port}....`);



