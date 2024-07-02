const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    username: { type: String, required: true },
    hobbies: { type: [String], required: true },
    bio: { type: String, required: true },
    profileImage: { type: String, required: true },
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);
module.exports = UserProfile;