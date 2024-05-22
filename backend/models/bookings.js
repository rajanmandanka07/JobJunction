const mongoose = require('mongoose')

const BookingsScema  = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
    date: {
        type : Date,
        
      },
    slot:{
        type : String,
        
    },
    usercoupon:{
        type : String,
        
    },
    taskerId:{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Tasker' 
    },
})

module.exports = mongoose.model('Bookings',BookingsScema,'Bookings')