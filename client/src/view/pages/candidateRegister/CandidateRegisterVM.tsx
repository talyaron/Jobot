export interface CandidateRegisterData {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
}

export function validateRegisterInput(registerData: CandidateRegisterData): string | null {
    if (!registerData.fullName.trim()) {
        return "Full name is required";
    }
    if (!registerData.email.trim()) {
        return "Email is required";
    }
    if (!registerData.password.trim()) {
        return "Password is required";
    }
    if (registerData.password.length < 6) {
        return "Password must be at least 6 characters long";
    }
    if (!registerData.phoneNumber.trim()) {
        return "Phone number is required";
    }
    return null;
}

export async function RegisterCandidate(registerData: CandidateRegisterData): Promise<{ success: boolean; message: string }> {
    const validationError = validateRegisterInput(registerData);
    if (validationError) {
        return { success: false, message: validationError };
    }

    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registerData),
            credentials: "include",
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Registration failed");
        }

        return { success: true, message: "Registration successful" };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : "An unexpected error occurred" };
    }
}
