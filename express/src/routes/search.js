const { Router } = require("express");
const UserProfile = require('../database/schemas/UserProfile');
const router = Router();

router.get('/search', async (req, res) => {
  const { hobby } = req.query;

  try {
    const users = await UserProfile.find({
      hobbies: hobby,
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;