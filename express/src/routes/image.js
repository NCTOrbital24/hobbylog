const { Router } = require('express');
const router = Router();

router.get("/:filePath", async (req, res) => {
    try {
        const filePath = "uploads/" + req.params.filePath;
        res.sendFile(filePath, {root: '.'});
    } catch (err) {
        console.log("Error fetching image", err);
        res.status(500).json({ message: err });
    }
})

module.exports = router;