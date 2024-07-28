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

        res.status(200).json({ message: "Friend added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
