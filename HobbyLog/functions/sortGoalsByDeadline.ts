import { Goal } from "./GoalConstructor";

const sortGoalsByDeadline = (goals: Array<Goal>) => {
    // Create a copy of the goals array to avoid mutating the original array
    const sortedGoals = [...goals];

    // Sort goals by their deadline in ascending order
    sortedGoals.sort((a, b) => {
        const deadlineA = new Date(a.deadline);
        const deadlineB = new Date(b.deadline);
        return deadlineA - deadlineB;
    });

    return sortedGoals;
};

export default sortGoalsByDeadline;