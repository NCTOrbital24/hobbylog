const Hobby = require("../database/schemas/Hobby");
const Task = require("../database/schemas/Task");
const checkOwnership = require("./checkOwnership.js");

const removeOneTask = async (req, res, next) => {
    const { hobbyId, taskId } = req.params;

    try {
        await checkOwnership(req, res, async () => {
            const hobby = await Hobby.findById(hobbyId);

            if (!hobby) {
                return res.status(404).json({ message: "Hobby not found" });
            }

            if (!hobby.tasks.includes(taskId)) {
                return res.status(404).json({ message: "Task not found in hobby" });
            }

            hobby.tasks = hobby.tasks.filter(id => id !== taskId);

            await hobby.save();

            await Task.findByIdAndDelete(taskId);

            next();
        });
    } catch (err) {
        console.error("Error removing task from hobby:", err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = removeOneTask;
