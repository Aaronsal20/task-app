const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  date: {
    type: Date,
    required: true
  },
  priority: { type: String, required: true }
})

module.exports = mongoose.model('Task', taskSchema);
