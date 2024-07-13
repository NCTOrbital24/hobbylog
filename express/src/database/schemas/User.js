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

const User = mongoose.model("User", userSchema);

module.exports = User;
