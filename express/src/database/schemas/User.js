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
    friends: {
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User"
        }],
        default: [],
    },
    hobbies: {
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Hobby"
        }],
        default: [],
    },
    exp: {type: Number, required: true, default: 0},
    level: { type: Number, required: true, default: 1 },
    bio: {
        type: String,
        default: "",
    },
    profileImage: {
        type: String,
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
