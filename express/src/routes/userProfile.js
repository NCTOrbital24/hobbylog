const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../database/schemas/UserProfile'); 
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads')); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('profileImage'), async (req, res) => {
    try {
        const { username, hobbies, bio } = req.body;
        const profileImage = req.file ? `/uploads/${req.file.filename}` : null;
        const profileData = { 
            hobbies: hobbies.split(','), 
            bio, 
            ...(profileImage && { profileImage })
        };

        let userProfile = await User.findOneAndUpdate(
            { username },
            profileData,
            { new: true, upsert: true }
        );

        res.status(201).json(userProfile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const userProfile = await User.findOne({ username });

        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(userProfile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
