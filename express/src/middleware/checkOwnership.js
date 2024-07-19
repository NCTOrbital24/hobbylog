const Hobby = require('../database/schemas/Hobby');

//middleware to check that a hobby belongs to a particular user.

const checkOwnership = async (req, res, next) => {
    const hobbyId = req.params.hobbyId || req.body.hobbyId; // Check hobbyId in params or body

    try {
        const hobby = await Hobby.findById(hobbyId);

        if (!hobby) {
            return res.status(404).json({ message: 'Hobby not found' });
        }

        if (hobby.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized to perform this action on this hobby' });
        }

        next();
    } catch (err) {
        console.error('Error checking ownership:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = checkOwnership;
