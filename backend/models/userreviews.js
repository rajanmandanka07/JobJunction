const mongoose = require('mongoose')

const UserReviewScema  = new mongoose.Schema({
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
    userId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
    taskerId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Tasker' 
    },
    review:{
        type:String,
        required:true
    },
    ratings:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('userReview',UserReviewScema,'userReview')