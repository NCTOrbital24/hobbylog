// Contains the hobby type and constructor. It's here to facilitate type safety later when creating hobbies
// and shuttling them between front and back.
// HobbyConstructor offers a clean, easy way to create Hobby objects.

import { Goal } from "./GoalConstructor";
import { Task } from "./TaskConstructor";
export interface Hobby {
    uid: string; //should be unique for each Hobby. Two users are embarking on the same hobby if they have the same uid.
    name: string; // can be repeated.
    description: string;
    totalGoals: number;
    goalsCompleted: number;
    icon: string; //replace local storage with database link when possible
    goals: Array<Goal>; //will fill in after deadline
    //array has been created in milestone 2
    tasks: Array<Task>
}

export default function HobbyConstructor(
    uid: string,
    name: string,
    description: string,
    goalsCompleted: number,
    icon: string,
    goals: Array<Goal>,
    tasks: Array<Task>,
): Hobby {
    if (goals.length >= goalsCompleted) {
        return {
            uid: uid,
            name: name,
            description: description,
            totalGoals: goals.length,
            goalsCompleted: goalsCompleted,
            icon: icon,
            goals: goals,
            tasks: tasks,
        };
    } else {
        throw Error;
    }
}