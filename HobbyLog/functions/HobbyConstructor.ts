// Contains the hobby type and constructor. It's here to facilitate type safety later when creating hobbies
// and shuttling them between front and back.
// HobbyConstructor offers a clean, easy way to create Hobby objects.

export interface Hobby {
    uid: string; //should be unique for each Hobby. Two users are embarking on the same hobby if they have the same uid.
    name: string; // can be repeated.
    description: string;
    totalTasks: number;
    tasksCompleted: number;
    icon: string; //replace local storage with database link when possible
    deadlines: Array<any>; //will fill in after deadline
    //array has been created in milestone 2
}

export default function HobbyConstructor(
    uid: string,
    name: string,
    description: string,
    totalTasks: number,
    tasksCompleted: number,
    icon: string,
    deadlines = []
): Hobby {
    if (totalTasks >= tasksCompleted) {
        return {
            uid: uid,
            name: name,
            description: description,
            totalTasks: totalTasks,
            tasksCompleted: tasksCompleted,
            icon: icon,
            deadlines: deadlines,
        };
    } else {
        throw Error;
    }
}
