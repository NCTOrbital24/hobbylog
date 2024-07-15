import { backendLink } from "@/constants/constants";
import parseHobby from "./ParseHobby";

const hobbyLink = backendLink + "/api/hobby/get";

export default async function fetchHobbies(setHobbies, userId) {
    const response = await fetch(hobbyLink, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    const hobbiesData = await response.json();

    const updatedHobbiesData = parseHobby(hobbiesData);

    setHobbies(updatedHobbiesData);
}
