const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  hobbies: { type: [String], default: [] },
  bio: { type: String, default: '' },
  profileImage: { type: String, default: '' },
});

// Ensure the model is defined only once
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
