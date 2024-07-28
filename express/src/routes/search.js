const { Router } = require("express");
const Hobby = require("../database/schemas/Hobby");
const User = require("../database/schemas/User");
const UserProfile = require("../database/schemas/UserProfile");
const router = Router();

router.get("/users", async (req, res) => {
    const searchQuery = req.query.search || '';

    try {
        // Query the database and return only `username` and `_id`
        const users = await User.find({
            username: { $regex: searchQuery, $options: 'i' } // Case-insensitive search
        }).select('username _id'); // Select only the `username` and `_id` fields
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

router.get("/hobbies", async (req, res) => {
    const searchQuery = req.query.search || "";
    try {
        const hobbies = await Hobby.find({
            name: { $regex: searchQuery, $options: "i" }, // Case-insensitive search
        });
        console.log(hobbies);
        res.json(hobbies);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Failed to fetch hobbies" });
    }
});

module.exports = router;
