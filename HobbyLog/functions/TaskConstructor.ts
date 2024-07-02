// Contains the hobby type and constructor. It's here to facilitate type safety later when creating hobbies
// and shuttling them between front and back.
// HobbyConstructor offers a clean, easy way to create Hobby objects.

export interface Task {
    uid: string; //should be unique for each Hobby. Two users are embarking on the same hobby if they have the same uid.
    name: string; // can be repeated.
    description: string;
    frequency: string; // determines if the task repeats once, daily, weekly, monthly or yearly
    time: number | null;
    day: number | null; //if month is null, determines the day of the week. If not, the day of the month
    month: number | null;
}

export default function TaskConstructor(
    uid: string,
    name: string,
    description: string,
    frequency: string,
    time: number | null,
    day: number | null,
    month: number | null
): Task {
    if (name && description && frequency) {
        return {
            uid: uid,
            name: name,
            description: description,
            frequency: frequency,
            time: time,
            day: day,
            month: month,
        };
    } else {
        throw Error;
    }
}