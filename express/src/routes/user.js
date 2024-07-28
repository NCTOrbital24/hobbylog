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

module.exports = router;
