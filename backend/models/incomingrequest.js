const mongoose = require('mongoose')

const IncomingRequestScema  = new mongoose.Schema({
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
    confirm :{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('incomingrequest',IncomingRequestScema,'incomingrequest')