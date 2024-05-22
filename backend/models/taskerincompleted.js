const mongoose = require('mongoose')

const TaskerIncompleteScema  = new mongoose.Schema({
    taskdate: {
        type : Date,
        required: true
      },
    taskslot:{
        type : String,
        required: true,
    },
    useraddress:{
        type : String,
        required: true,
    },
    username:{
        type:String,
        required:true
    },
    userphone:{
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
    taskerId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Tasker'
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
    reason:{
        type:String,
    },
    review:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model('taskerIncomplete',TaskerIncompleteScema,'taskerIncomplete')