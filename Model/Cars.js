const mongoose = require ('mongoose');

const carSchema = new mongoose.Schema({
    
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    carName: {
        type: String
    },  
    model: {
        type: String
    },
    color:{
        type: String
    },
    purchaseDate: {
        type: Date
        
    }
});

module.exports = mongoose.model('Cars', carSchema);