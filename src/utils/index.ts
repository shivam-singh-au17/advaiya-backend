import bcrypt from "bcryptjs";

/**
 * Generate a salt for password hashing.
 */
export const generateSalt = async (): Promise<string> => {
    return bcrypt.genSalt();
};

/**
 * Hash the provided password using the given salt.
 */
export const generatePassword = async (password: string, salt: string): Promise<string> => {
    return bcrypt.hash(password, salt);
};

/**
 * Validate if the entered password matches the saved password.
 */
export const validatePassword = async (
    enteredPassword: string,
    savedPassword: string,
    salt: string
): Promise<boolean> => {
    const hashedEnteredPassword = await bcrypt.hash(enteredPassword, salt);
    return hashedEnteredPassword === savedPassword;
};

/**
 * Format data into a standardized response format.
 */
export const formatData = (data: any): any => {
    if (data) {
        return { data };
    } else {
        throw new Error("Data not found!");
    }
};
