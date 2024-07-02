<<<<<<< HEAD
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
=======
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },

    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: false,
    },

    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },

    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date(),
    },

    hobbies: {
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Hobby"
        }],
        default: [],
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
>>>>>>> master
