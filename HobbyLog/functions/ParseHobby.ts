/*
Had an issue where Dates were being processed into strings. This function converts all deadlines in a Hobby back to Date objects.
*/

import { Hobby } from "./HobbyConstructor";

export default function parseHobby(hobbiesData: Array<Hobby>) {
    return hobbiesData.map((hobby) => ({
        ...hobby,
        goals: hobby.goals.map((goal) => ({
            ...goal,
            deadline: new Date(goal.deadline),
        })),
    }));
}