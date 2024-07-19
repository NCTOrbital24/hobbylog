const Hobby = require("../database/schemas/Hobby");
const checkOwnership = require("./checkOwnership.js");
const Task = require("../database/schemas/Task.js");

const addAllTasks = async (req, res, next) => {
    const hobbyId = req.params.hobbyId;
    const tasks = req.body.tasks;

    try {
        await checkOwnership(req, res, async () => {
            const hobby = await Hobby.findById(hobbyId);

            if (!hobby) {
                return res.sendStatus(404).json({ message: "Hobby not found" });
            }

            const savedTasks = [];
            for (const taskData of tasks) {
                const newTask = new Task(taskData);
                const savedTask = await newTask.save();
                savedTasks.push(savedTask._id);
            }

            hobby.goals.push(...savedGoals);

            await hobby.save();

            res.sendStatus(200).json({
                message: "All tasks added to Hobby successfully",
            });
        });
    } catch (err) {
        console.error("Error adding tasks to hobby", err);
        res.sendStatus(500).json({
            message: "Server Error",
        });
    }
};

module.exports = addAllTasks;
