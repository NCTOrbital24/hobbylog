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
const router = Router();

router.delete(
    "/:hobbyId/goals/removeAll",
    isAuthenticated,
    removeAllGoals,
    async (req, res) => {
        res.status(200).json({ message: "Hobby deleted successfully" });
    }
);

router.delete(
    "/:hobbyId/tasks/removeAll",
    isAuthenticated,
    removeAllTasks,
    async (req, res) => {
        res.sendStatus(200).json({
            message: "All goals deleted from Hobby successfully",
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
)

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

router.get("/hobby", isAuthenticated, async (req, res) => {
    const userId = req.body.userId;

    try {
        const user = await User.findById(userId).populate('hobbies');

        if (!user) {
            return res.status(404).json({ message: "user not found" });
    
        }

        res.status(200).json(user.hobbies);
    } catch (err) {
        console.error("Error fetching user hobbies", err);
        res.status(500).json({ message: "Server Error" });
    }
})

router.post("/:hobbyId/goals/addAll", isAuthenticated, addAllGoals);

router.post("/:hobbyId/tasks/addAll", isAuthenticated, addAllTasks);

router.post("/create", isAuthenticated, async (req, res) => {
    const { hobbyName, hobbyDescription, goals, tasks } = req.body;

    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

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

        res.status(201).json({ hobby: savedHobby });
    } catch (err) {
        console.log("Error in hobby creation: ", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router; //export router
