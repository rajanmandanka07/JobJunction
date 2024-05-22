const mongoose = require('mongoose')

const TaskerConfirmScema  = new mongoose.Schema({
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
})

module.exports = mongoose.model('taskerConfirm',TaskerConfirmScema,'taskerConfirm')