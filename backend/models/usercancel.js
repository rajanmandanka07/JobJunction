const mongoose = require('mongoose')

const UserCancelScema  = new mongoose.Schema({
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
    username:{
        type:String,
        required:true
    },
    userphone:{
        type:Number,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
    taskerId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Tasker' 
    },
    reason:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('userCancel',UserCancelScema,'userCancel')