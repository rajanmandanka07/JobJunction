const mongoose = require('mongoose')

const UserConfirmScema  = new mongoose.Schema({
    taskdate: {
        type : Date,
        required: true
      },
    taskslot:{
        type : String,
        required: true,
    },
    taskername:{
        type:String,
        required:true
    },
    taskerphone:{
        type:Number,
        required:true
    },
    taskprice:{
        type:Number,
        required:true
    },
    taskname:{
        type:String,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
    taskerId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Tasker' 
    }
})

module.exports = mongoose.model('userConfirm',UserConfirmScema,'userConfirm')