const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: false,
    },

    hobbies: {
        type: [String],
        required: true,
    },

    bio: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },

    profileImage: {
        type: mongoose.SchemaTypes.String,
    },
});

module.exports = mongoose.model("UserProfile", UserProfileSchema);
