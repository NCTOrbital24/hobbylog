const { Router } = require("express");
const User = require("../database/schemas/User");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = Router();

router.get("/:userId/level", isAuthenticated, async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Could not find user." });
        }

        res.status(200).json({
            level: user.level,
            exp: user.exp,
        });
    } catch (err) {
        console.error("Error fetching user level", err);
        res.status(500).json({
            message: "Server error",
        });
    }
});

router.get("/:userId/friends", isAuthenticated, async (req, res) => {
    const userId = req.params.userId;
    try {
        // Find the user by ID
        const user = await User.findById(userId).populate({
            path: "friends",
            select: "username _id", // Only include username and _id
        }).lean();

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const tweakedFriends = user.friends.map(friend => ({
            ...friend,
            isFriend: true
        }));

        // Return the friends array
        res.status(200).json(tweakedFriends);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
