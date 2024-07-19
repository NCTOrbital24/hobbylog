const Hobby = require("../database/schemas/Hobby");
const Task = require("../database/schemas/Task");
const checkOwnership = require("./checkOwnership.js");

const removeAllTasks = async (req, res, next) => {
    const hobbyId = req.params.hobbyId;

    try {
        await checkOwnership(req, res, async () => {
            const hobby = await Hobby.findById(hobbyId);

            if (!hobby) {
                return res.sendStatus(404).json({ message: "Hobby not found" });
            }

            for (const taskId of hobby.tasks) {
                await Task.findByIdAndDelete(taskId);
            }

            hobby.tasks = [];
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

module.exports = removeAllTasks;
