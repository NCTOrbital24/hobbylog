const { Router } = require("express");
const passport = require("passport");
const User = require("../database/schemas/User");
const Hobby = require("../database/schemas/Hobby");
const Goal = require("../database/schemas/Goal");
const Task = require("../database/schemas/Task");
const isAuthenticated = require("../middleware/isAuthenticated");
const removeAllGoals = require("../middleware/removeAllGoals");
const removeAllTasks = require("../middleware/removeAllTasks");
const addAllGoals = require("../middleware/addAllGoals");
const addAllTasks = require("../middleware/addAllTasks");
const removeOneGoal = require("../middleware/removeOneGoal");
const removeOneTask = require("../middleware/removeOneTask");
const sortHobbiesByClosestDeadline = require("../utils/sortHobbies");
const router = Router();

router.post("/clear", isAuthenticated, async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const user = await User.findById(userId).populate("hobbies");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await Hobby.deleteMany({ _id: { $in: user.hobbies } });

        user.hobbies = [];
        await user.save();

        res.status(200).json({ message: "All hobbies have been cleared" });
    } catch (err) {
        console.error("Error clearing hobbies:", err);
        res.status(500).json({ message: "Server Error" });
    }
});

router.delete(
    "/:hobbyId/goals/removeAll",
    isAuthenticated,
    removeAllGoals,
    async (req, res) => {
        res.status(200).json({
            message: "All goals deleted from Hobby successfully",
        });
    }
);

router.delete(
    "/:hobbyId/tasks/removeAll",
    isAuthenticated,
    removeAllTasks,
    async (req, res) => {
        res.sendStatus(200).json({
            message: "All tasks deleted from Hobby successfully",
        });
    }
);

router.delete(
    "/:hobbyId/goals/:goalId/remove",
    isAuthenticated,
    removeOneGoal,
    async (req, res) => {
        res.sendStatus(200).json({
            message: "Goal deleted from Hobby successfully",
        });
    }
);

router.delete(
    "/:hobbyId/tasks/:taskId/remove",
    isAuthenticated,
    removeOneTask,
    async (req, res) => {
        res.sendStatus(200).json({
            message: "Task deleted from Hobby successfully",
        });
    }
);

router.delete(
    "/:hobbyId/remove",
    isAuthenticated,
    removeAllGoals,
    removeAllTasks,
    async (req, res) => {
        //this requires you to send a DELETE request to the server at
        //./api/hobby/(hobby_id)/remove
        const hobbyId = req.params.hobbyId;

        try {
            const hobby = await Hobby.findById(hobbyId);

            if (!hobby) {
                return res.status(404).json({ message: "Hobby not found" });
            }

            const user = req.user;
            if (hobby.user.toString() !== user._id.toString()) {
                return res
                    .status(403)
                    .json({ message: "unauthorised to remove hobby" });
            }

            await hobby.deleteOne();

            user.hobbies = user.hobbies.filter(
                (hobby) => hobby.toString() !== hobbyId
            );

            await user.save();

            res.status(200).json({ message: "Hobby deleted successfully!" });
        } catch (err) {
            console.error("Error deleting hobby", err);
            res.status(500).json({ message: "Server error" });
        }
    }
);

router.post("/get", isAuthenticated, async (req, res) => {
    const userId = req.body.userId;

    try {
        const user = await User.findById(userId).populate({
            path: "hobbies",
            populate: [{ path: "goals" }, { path: "tasks" }],
        });

        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        res.status(200).json(user.hobbies);
    } catch (err) {
        console.error("Error fetching user hobbies", err);
        res.status(500).json({ message: "Server Error" });
    }
});



router.post("/:hobbyId/goals/addAll", isAuthenticated, addAllGoals);

router.post("/:hobbyId/tasks/addAll", isAuthenticated, addAllTasks);

router.post("/create", isAuthenticated, async (req, res) => {
    const { hobbyName, hobbyDescription, goals, tasks } = req.body;

    try {
        const user = req.user;
        console.log("user");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("creating new hobby");

        const goalList = [];
        const taskList = [];

        const newHobby = new Hobby({
            name: hobbyName,
            description: hobbyDescription,
            user: user._id,
        });

        const savedHobby = await newHobby.save();
        user.hobbies.push(savedHobby._id);
        await user.save();

        for (const goalData of goals) {
            const newGoal = new Goal({
                name: goalData.name,
                description: goalData.description,
                deadline: goalData.deadline,
                hobbyId: savedHobby._id,
                completed: false,
                exp: goalData.exp,
            });

            const savedGoal = await newGoal.save();
            goalList.push(savedGoal);
        }

        for (const taskData of tasks) {
            const newTask = new Task({
                name: taskData.name,
                description: taskData.description,
                hobbyId: savedHobby._id,
                frequency: taskData.frequency,
            });

            const savedTask = await newTask.save();
            taskList.push(savedTask);
        }

        savedHobby.goals = goalList.map((goal) => goal._id);
        savedHobby.tasks = taskList.map((task) => task._id);
        await savedHobby.save();

        const sortedHobbies = sortHobbiesByClosestDeadline(user._id, true);

        res.status(201).json({ hobby: savedHobby });
    } catch (err) {
        console.log("Error in hobby creation: ", err);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/:hobbyId/get", isAuthenticated, async (req, res) => {
    const hobbyId = req.params.hobbyId;

    try {
        const hobby = await Hobby.findById(hobbyId)
            .populate("goals")
            .populate("tasks");

        if (!hobby) {
            return res.status(404).json({ message: "Hobby not found" });
        }

        // Check if the hobby belongs to the authenticated user
        const user = req.user;
        if (!user.hobbies.includes(hobbyId.toString())) {
            return res.status(403).json({ message: "Unauthorized to access this hobby" });
        }

        res.status(200).json(hobby);
    } catch (err) {
        console.error("Error fetching hobby:", err);
        res.status(500).json({ message: "Server Error" });
    }
});

router.put("/:hobbyId/update", isAuthenticated, async (req, res) => {
    const hobbyId = req.params.hobbyId; 
    const { name, description, goals, tasks } = req.body;

    try {
        // Find the hobby by ID
        const hobby = await Hobby.findById(hobbyId);

        if (!hobby) {
            return res.status(404).json({ message: "Hobby not found" });
        }

        // Check if the authenticated user owns this hobby
        const user = req.user;
        if (hobby.user.toString() !== user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized to update this hobby" });
        }

        // Update hobby fields
        hobby.name = name;
        hobby.description = description;

        // Update or add goals
        const updatedGoals = await Promise.all(
            goals.map(async (goalData) => {
                let goal;

                if (goalData._id) {
                    // If goal has an ID, update existing goal
                    goal = await Goal.findByIdAndUpdate(goalData._id, goalData, { new: true });
                } else {
                    // If goal doesn't have an ID, create a new goal
                    goal = new Goal({ ...goalData, hobbyId: hobby._id });
                    await goal.save();
                    hobby.goals.push(goal._id);
                }

                return goal;
            })
        );

        // Remove goals that were deleted
        hobby.goals = hobby.goals.filter((goalId) =>
            updatedGoals.find((goal) => goal._id.equals(goalId))
        );

        // Update or add tasks
        const updatedTasks = await Promise.all(
            tasks.map(async (taskData) => {
                let task;

                if (taskData._id) {
                    // If task has an ID, update existing task
                    task = await Task.findByIdAndUpdate(taskData._id, taskData, { new: true });
                } else {
                    // If task doesn't have an ID, create a new task
                    task = new Task({ ...taskData, hobbyId: hobby._id });
                    await task.save();
                    hobby.tasks.push(task._id);
                }

                return task;
            })
        );

        // Remove tasks that were deleted
        hobby.tasks = hobby.tasks.filter((taskId) =>
            updatedTasks.find((task) => task._id.equals(taskId))
        );

        // Save updated hobby
        await hobby.save();
        const sortedHobbies = sortHobbiesByClosestDeadline(user._id, true);

        console.log("UPDATING SUCCESSFUL!");

        res.status(200).json({ hobby });
    } catch (err) {
        console.error("Error updating hobby:", err);
        res.status(500).json({ message: "Server Error" });
    }
});


module.exports = router; //export router
