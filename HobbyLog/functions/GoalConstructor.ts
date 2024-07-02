export interface Goal {
    uid: string; //should be unique for each goal within a hobby.
    name: string; // can be repeated.
    description: string;
    deadline: Date;
    completed: boolean;
}

export default function GoalConstructor(
    uid: string,
    name: string,
    description: string,
    deadline: Date,
    completed: boolean,
): Goal {
    if (name && description) {
        return {
            uid: uid ,
            name: name,
            description: description,
            deadline: deadline,
            completed: completed,
        };
    } else {
        throw Error;
    }
}