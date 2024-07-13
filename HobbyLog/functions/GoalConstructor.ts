export interface Goal {
    _id: string; //should be unique for each goal within a hobby.
    name: string; // can be repeated.
    description: string;
    deadline: Date;
    completed: boolean;
    exp: number;
}

export default function GoalConstructor(
    uid: string,
    name: string,
    description: string,
    deadline: Date,
    completed: boolean,
    exp: number
): Goal {
    if (name && description) {
        return {
            _id: uid,
            name: name,
            description: description,
            deadline: deadline,
            completed: completed,
            exp: exp,
        };
    } else {
        throw Error;
    }
}
