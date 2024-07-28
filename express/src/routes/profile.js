const express = require('express');
const router = express.Router();
const UserProfile = require('../database/schemas/UserProfile');
const Hobby = require('../database/schemas/Hobby');

router.post('/profile', async (req, res) => {
  const { username, hobbies, bio, profileImage } = req.body;

  const userProfile = new UserProfile({ username, hobbies, bio, profileImage });
  
  try {
    await userProfile.save();
    
    const hobbiesArray = hobbies.map(hobby => ({
      name: hobby,
      user: userProfile._id,
      description: `${username}'s hobby`,
      profilePic: profileImage,
    }));

    await Hobby.insertMany(hobbiesArray);

    res.status(201).json(userProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;