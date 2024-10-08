const { Router } = require("express");
const User = require("../database/schemas/User");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = Router();

router.put("/:userId/add", isAuthenticated, async (req, res) => {
    const userId = req.params.userId;

    try {
        // Find both users
        const user = req.user;
        const friend = await User.findById(userId);

        if (!user || !friend) {
            return res.status(404).json({ message: "User or Friend could not be found" });
        }

        if (user.friends.includes(userId)) {
            return res.status(400).json({ message: "Already friends" });
        }

        user.friends.push(userId);

        // Save both users
        await user.save();
        console.log("friend made!");

        res.status(200).json({ message: "Friend added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/:userId/remove", isAuthenticated, async (req, res) => {
    const userId = req.params.userId;

    try {
        // Find both users
        const user = req.user;
        const friend = await User.findById(userId);

        if (!user || !friend) {
            return res.status(404).json({ message: "User or Friend could not be found" });
        }

        // Check if they are already friends
        if (!user.friends.includes(userId)) {
            return res.status(400).json({ message: "Not friends" });
        }

        // Remove the friend
        user.friends = user.friends.filter(friendId => friendId.toString() !== userId);

        // Save the updated user
        await user.save();
        console.log("Friend removed!");

        res.status(200).json({ message: "Friend removed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
