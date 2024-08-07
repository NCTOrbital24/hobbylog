// Contains the hobby type and constructor. It's here to facilitate type safety later when creating hobbies
// and shuttling them between front and back.
// HobbyConstructor offers a clean, easy way to create Hobby objects.

import { Goal } from "./GoalConstructor";
import { Task } from "./TaskConstructor";
export interface Hobby {
    _id: string; //should be unique for each Hobby. Two users are embarking on the same hobby if they have the same uid.
    name: string; // can be repeated.
    description: string;
    totalGoals: number;
    goalsCompleted: number;
    profileImage: string; //replace local storage with database link when possible
    goals: Array<Goal>;
    tasks: Array<Task>
}

export const EMPTY_HOBBY = HobbyConstructor("", "", "", 0, "", [], []);

export default function HobbyConstructor(
    _id: string,
    name: string,
    description: string,
    goalsCompleted: number,
    profileImage: string,
    goals: Array<Goal>,
    tasks: Array<Task>,
): Hobby {
    if (goals.length >= goalsCompleted) {
        return {
            _id: _id,
            name: name,
            description: description,
            totalGoals: goals.length,
            goalsCompleted: goalsCompleted,
            profileImage: profileImage,
            goals: goals,
            tasks: tasks,
        };
    } else {
        throw Error;
    }
}