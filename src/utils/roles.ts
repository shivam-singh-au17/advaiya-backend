export const roles = {
    ADMIN: "ADMIN",
    USER: "USER"
} as const;

export type Role = typeof roles[keyof typeof roles];
