// Contains the hobby type and constructor. It's here to facilitate type safety later when creating hobbies
// and shuttling them between front and back.
// HobbyConstructor offers a clean, easy way to create Hobby objects.

export interface Task {
    _id: string; //should be unique for each Hobby. Two users are embarking on the same hobby if they have the same uid.
    name: string; // can be repeated.
    description: string;
    frequency: string; // determines if the task repeats once, daily, weekly, monthly or yearly
    lastCompleted: Date;
    exp: number;
    nextDueDate: Date;
}

export default function TaskConstructor(
    _id: string,
    name: string,
    description: string,
    frequency: string,
    lastDueDate: Date,
    exp: number,
): Task {
    if (name && description && frequency) {
        return {
            _id: _id,
            name: name,
            description: description,
            frequency: frequency,
            lastDueDate: lastDueDate,
            exp: exp,
        };
    } else {
        throw Error;
    }
}