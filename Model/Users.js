const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        require: true,
    },
    
    age: {
        type: Number
    },
    cnic:{
        type: String
    },
    email: {
        type: String,
        require: true,
        // min: 6,
        // max: 255
    },
    password: {
        type: String,
        require: true,
        // min: 8,
        //  max: 1024
    }
});

module.exports = mongoose.model('User', userSchema);