const Hobby = require("../database/schemas/Hobby");
const Goal = require("../database/schemas/Goal");
const checkOwnership = require("./checkOwnership.js");

const removeAllGoals = async (req, res, next) => {
    const hobbyId = req.params.hobbyId || req.query.hobbyId;

    try {
        await checkOwnership(req, res, async () => {
            const hobby = await Hobby.findById(hobbyId);

            if (!hobby) {
                return res.sendStatus(404).json({ message: "Hobby not found" });
            }

            for (const goalId of hobby.goals) {
                await Goal.findByIdAndDelete(goalId);
            }

            hobby.goals = [];
            await hobby.save();

            next();
        });
    } catch (err) {
        console.error("Error deleting goals from hobby", err);
        res.sendStatus(500).json({
            message: "Server Error",
        });
    }
};

module.exports = removeAllGoals;
