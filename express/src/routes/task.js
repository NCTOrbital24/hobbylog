const { Router } = require("express");
const User = require("../database/schemas/User");
const Hobby = require("../database/schemas/Hobby");
const isAuthenticated = require("../middleware/isAuthenticated");
const sortHobbiesByClosestDeadline = require("../utils/sortHobbies");
const Task = require("../database/schemas/Task");
const router = Router();

const levelUpExp = (level) => 100 * level;

//toggles a goal as completed if it's your goal
router.put("/:taskId/markComplete", isAuthenticated, async (req, res) => {
    const taskId = req.params.taskId;

    try {
        const task = await Task.findById(goalId);

        if (!task) {
            return res.status(404).json({ message: "task could not be found" });
        }

        const now = new Date();
        // if it is more than 12 hours before the time the task is to be done:
        if (now < new Date(task.nextDueDate.getTime() - (12 * 60 * 60 * 1000))) {
            return res.status(400).json({
                message: "Task completed too early"
            })
        }

        task.lastCompleted = task.nextDueDate;
        if (task.frequency === 'daily') {
            task.nextDueDate = new Date(now.setDate(now.getDate() + 1));
        }
        if (task.frequency === 'weekly') {
            task.nextDueDate = new Date(now.setDate(now.getDate() + 7));
        }
        if (task.frequency === 'monthly') {
            task.nextDueDate = new Date(now.setDate(now.getDate() + 1));
        }

        const hobby = await Hobby.findById(task.hobbyId);

        if (!hobby) {
            return res
                .status(404)
                .json({ message: "goal does not belong to a hobby" });
        }

        const user = req.user;
        if (hobby.user.toString() !== user._id.toString()) {
            return res
                .status(403)
                .json({ message: "User unauthorised to update this goal" });
        }

            user.exp += task.exp;
            while (user.exp >= levelUpExp(user.level)) {
                user.exp -= levelUpExp(user.level);
                user.level += 1;
            }
            await user.save();
        await task.save();

        const sortedHobbies = sortHobbiesByClosestDeadline(user._id, true);

        res.status(200).json({ message: "Goal marked as completed", goal });
    } catch (err) {
        console.log("Error marking goal as complete", err);
        res.status(500).json({ message: "Server Error" });
    }
});

router.put("/:goalId/markIncomplete", isAuthenticated, async (req, res) => {
    const goalId = req.params.goalId;

    try {
        const goal = await Goal.findById(goalId);

        if (!goal) {
            return res.status(404).json({ message: "goal could not be found" });
        }

        const hobby = await Hobby.findById(goal.hobbyId);

        if (!hobby) {
            return res
                .status(404)
                .json({ message: "goal does not belong to a hobby" });
        }

        const user = req.user;
        if (hobby.user.toString() !== user._id.toString()) {
            return res
                .status(403)
                .json({ message: "User unauthorised to update this goal" });
        }

        if (!goal.completed) {
            return res
                .status(400)
                .json({ message: "Goal is already incomplete" });
        }

        goal.completed = false;

        //PUT EXP STUFF HERE

        await goal.save();

        const sortedHobbies = sortHobbiesByClosestDeadline(user._id, true);

        res.status(200).json({ message: "Goal marked as not completed", goal });
    } catch (err) {
        console.log("Error marking goal as incomplete", err);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
