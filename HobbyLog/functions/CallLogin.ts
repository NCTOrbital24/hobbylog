import { backendLink } from "../constants/constants";

const loginLink = backendLink + "/api/auth/login";

export default async function CallLogin(email: string | null, password: string | null) {
    try {
        const response = await fetch(loginLink, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        // Check if the response status is OK (200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Attempt to parse the response as JSON
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("There was a problem with the login operation:", error);
        // Optionally return a value or rethrow the error
        throw error;
    }
}