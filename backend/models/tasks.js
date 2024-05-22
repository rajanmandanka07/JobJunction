const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
      },
    task: {
        type: String,
        required: true,
        unique: true
      },
    price: {
        type : Number,
        required: true
      }
});
module.exports = mongoose.model('Tasks',TaskSchema,'Tasks')