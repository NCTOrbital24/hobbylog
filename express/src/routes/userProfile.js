const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Hobby = require('../database/schemas/Hobby');
const User = require('../database/schemas/User'); // Adjust the path as necessary

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Correct path to 'uploads' directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`); // Use a unique suffix
    },
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only JPEG and PNG are allowed!'), false);
    }
};

const upload = multer({
    limits: { fileSize: 800000 }, // Limit file size to 800KB
    storage: storage,
    fileFilter: fileFilter,
});
// COULD THIS BE A MIDDLEWARE? YES. AM I GOING TO? NO.

router.post('/', upload.single('profileImage'), async (req, res) => {
    try {
        const { username, bio } = req.body;
        const profileImage = req.file ? `${req.file.filename}` : null;

        if (username === "" && bio === "" && !profileImage) {
            return res.status(400).json({ message: 'No changes to make?' });
        }

        const user = req.user;

        if (username !== "") {
            user.username = username;
        }
        user.bio = bio;
        if (profileImage) {
            const oldLink = `./uploads/${user.profileImage}`
            fs.unlink(oldLink, (err) => {
                if (err) {
                    console.error("Error deleting old image", err);
                }
            });
            user.profileImage = profileImage;
        }

        await user.save();

        res.status(201).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error uploading profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("Fetching profile from:", userId);

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const initialUserProfile = await User.findById(userId)
            .populate('hobbies', 'name goals tasks')
            .select('username bio hobbies profileImage level exp');
        const userObject = initialUserProfile.toObject();
        const userProfile = {
            ...userObject,
            hobbies: initialUserProfile.hobbies.map(hobby => ({
                _id: hobby._id,
                name: hobby.name,
                goals: hobby.goals.length,
                tasks: hobby.tasks.length,
                user: userObject.username
            }))
        };

        console.log(userProfile);

        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(userProfile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
