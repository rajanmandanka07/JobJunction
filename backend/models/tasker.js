const mongoose = require('mongoose');

const BeaTaskerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  task: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('BeaTasker', BeaTaskerSchema,'Tasker');
