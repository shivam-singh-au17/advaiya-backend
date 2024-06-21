import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';
import { AccountInstance } from '../models/Account';

export const generateToken = (payload: Partial<AccountInstance>): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '4h' });
};

export const verifyToken = (token: string): Partial<AccountInstance> | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as Partial<AccountInstance>;
    } catch (error) {
        return null;
    }
};
