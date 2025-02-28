export interface CandidateLogin {
    email: string;
    password: string;
}

export function validateLoginInput(loginData: CandidateLogin): string | null {
    if (!loginData.email.trim()) {
        return "Email is required";
    }
    if (!loginData.password.trim()) {
        return "Password is required";
    }
    if (loginData.password.length < 6) {
        return "Password must be at least 6 characters long";
    }
    return null;
}

export async function loginCandidate(loginData: CandidateLogin): Promise<{ success: boolean; message: string }> {
    const validationError = validateLoginInput(loginData);
    if (validationError) {
        return { success: false, message: validationError };
    }

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData),
            credentials: "include",
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        return { success: true, message: "Login successful" };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : "An unexpected error occurred" };
    }
}
