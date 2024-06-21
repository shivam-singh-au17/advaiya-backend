import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { APIError } from '../utils/errors';
import { UNAUTHORIZED } from '../utils/status-codes';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new APIError('Authentication token missing', UNAUTHORIZED, 'Unauthorized'));
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
        return next(new APIError('Invalid token', UNAUTHORIZED, 'Unauthorized'));
    }

    req.user = decoded;
    next();
};
