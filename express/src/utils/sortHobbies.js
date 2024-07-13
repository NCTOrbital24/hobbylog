const mongoose = require('mongoose');
const User = mongoose.model('User');
const Hobby = mongoose.model('Hobby');
const Goal = mongoose.model('Goal');

const sortHobbiesByClosestDeadline = async (userId, saveToDatabase = false) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        const sortedHobbies = await Promise.all(
            user.hobbies.map(async hobby => {
                const goals = await Goal.find({ hobbyId: hobby._id, completed: false });
                const closestDeadline = goals.length > 0 ? Math.min(...goals.map(goal => goal.deadline)) : null;
                return { hobby, closestDeadline };
            })
        );

        sortedHobbies.sort((a, b) => {
            if (a.closestDeadline && b.closestDeadline) {
                return a.closestDeadline - b.closestDeadline;
            } else if (a.closestDeadline) {
                return -1; // a has a deadline but b doesn't
            } else if (b.closestDeadline) {
                return 1; // b has a deadline but a doesn't
            } else {
                return 0; // both have no deadline
            }
        });

        if (saveToDatabase) {
            console.log("sorting");
            user.hobbies = sortedHobbies.map(sorted => sorted.hobby);
            await user.save();
        }

        return sortedHobbies.map(sorted => sorted.hobby);
    } catch (err) {
        console.error('Error sorting user hobbies:', err);
        throw new Error('Error sorting user hobbies');
    }
};

module.exports = sortHobbiesByClosestDeadline;
