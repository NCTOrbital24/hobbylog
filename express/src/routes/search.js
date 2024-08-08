const { Router } = require("express");
const Hobby = require("../database/schemas/Hobby");
const User = require("../database/schemas/User");
const router = Router();

router.get("/users", async (req, res) => {
    const searchQuery = req.query.search || '';

    try {
        // Query the database and return only `username` and `_id`
        const users = await User.find({
            username: { $regex: searchQuery, $options: 'i' } // Case-insensitive search
        }).select('username _id profileImage').lean(); // Select only the `username` and `_id` fields
        
        const currentUser = await User.findById(req.user._id).select('friends').lean();
        const friendIds = currentUser.friends.map(friendId => friendId._id.toString());

        const cleansedUsers = users.map(user => ({
            ...user,
            isFriend: friendIds.includes(user._id.toString()),
        }));

        res.json(cleansedUsers);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

router.get("/hobbies", async (req, res) => {
    const searchQuery = req.query.search || "";
    try {
        const hobbies = await Hobby.find({
            name: { $regex: searchQuery, $options: "i" }, // Case-insensitive search
        }).populate('user', 'username').lean();
        const mutHobbies = hobbies.map(hobby => ({
            name: hobby.name,
            description: hobby.description,
            profileImage: hobby.profileImage,
            goals: hobby.goals.length,
            tasks: hobby.tasks.length,
            user: hobby.user.username,
        }))
        console.log(mutHobbies);
        res.json(mutHobbies);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Failed to fetch hobbies" });
    }
});

module.exports = router;
