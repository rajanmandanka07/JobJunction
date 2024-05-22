const mongoose = require('mongoose')

const TaskerPendingScema  = new mongoose.Schema({
    taskdate: {
        type : Date,
        
      },
    taskslot:{
        type : String,
        
    },
    useraddress:{
        type : String,
        
    },
    username:{
        type:String,
        
    },
    userphone:{
        type:Number,
        
    },
    taskprice:{
        type:Number,
        
    },
    taskname:{
        type:String,
        
    },
    taskerId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Tasker'
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
})

module.exports = mongoose.model('taskerPending',TaskerPendingScema,'taskerPending')