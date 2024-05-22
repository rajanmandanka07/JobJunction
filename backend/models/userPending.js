const mongoose = require('mongoose')

const UserPendingScema  = new mongoose.Schema({
    taskdate: {
        type : Date,
        
      },
    taskslot:{
        type : String,
        
    },
    taskername:{
        type:String,
        
    },
    taskerphone:{
        type:Number,
       
    },
    taskprice:{
        type:Number,
        
    },
    taskname:{
        type:String,
        
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
    taskerId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Tasker' 
    }
})

module.exports = mongoose.model('userPending',UserPendingScema,'userPending')