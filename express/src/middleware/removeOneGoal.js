const Hobby = require("../database/schemas/Hobby");
const Goal = require("../database/schemas/Goal");
const checkOwnership = require("./checkOwnership.js");

const removeOneGoal = async (req, res, next) => {
    const { hobbyId, goalId } = req.params;

    try {
        await checkOwnership(req, res, async () => {
            const hobby = await Hobby.findById(hobbyId);

            if (!hobby) {
                return res.status(404).json({ message: "Hobby not found" });
            }

            if (!hobby.goals.includes(goalId)) {
                return res.status(404).json({ message: "Goal not found in hobby" });
            }

            hobby.goals = hobby.goals.filter(id => id !== goalId);

            await hobby.save();

            await Goal.findByIdAndDelete(goalId);

            next();
        });
    } catch (err) {
        console.error("Error removing goal from hobby:", err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = removeOneGoal;
