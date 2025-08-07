const mongoose = require('mongoose');

module.exports = mongoose.model('Task', new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo', },
  createdAt: { type: Date, default: Date.now },
  due_date: { type: Date, default: Date.now }
}));