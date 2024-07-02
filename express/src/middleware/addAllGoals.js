const Hobby = require("../database/schemas/Hobby");
const Goal = require("../database/schemas/Goal");
const checkOwnership = require("./checkOwnership.js");

const addAllGoals = async (req, res, next) => {
    const hobbyId = req.params.hobbyId;
    const goals = req.body.goals;

    try {
        await checkOwnership(req, res, async () => {
            const hobby = await Hobby.findById(hobbyId);

            if (!hobby) {
                return res.sendStatus(404).json({ message: "Hobby not found" });
            }

            const savedGoals = [];
            for (const goalData of goals) {
                const newGoal = new Goal(goalData);
                const savedGoal = await newGoal.save();
                savedGoals.push(savedGoal._id);
            }

            hobby.goals.push(...savedGoals);

            await hobby.save();

            res.sendStatus(200).json({
                message: "All goals added to Hobby successfully",
            });
        });
    } catch (err) {
        console.error("Error adding goals to hobby", err);
        res.sendStatus(500).json({
            message: "Server Error",
        });
    }
};

module.exports = addAllGoals;
