export interface Hobby {
    uid: string;
    name: string;
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
