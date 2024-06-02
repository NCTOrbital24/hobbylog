import { backendLink } from "../constants/constants";

const loginLink = backendLink + "/api/auth/login";

export default async function CallLogin(email: string | null, password: string | null) {
    try {
        return await fetch(loginLink, {
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
    } catch (error) {
        console.error(
            "There was a problem with the login operation:",
            error
        );
    }
}