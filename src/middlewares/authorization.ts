import { Request, Response, NextFunction } from 'express';
import { APIError } from '../utils/errors';
import { UNAUTHORIZED, INTERNAL_ERROR } from '../utils/status-codes';
import { Role } from '../utils/roles';

export const authorize = (permittedRoles: Role[]) => {
    if (!Array.isArray(permittedRoles)) {
        throw new Error('Permitted Roles must be an array.');
    }

    return (req: Request, res: Response, next: NextFunction): void => {
        const user = req.user;

        if (!user || !Array.isArray(user.role)) {
            return next(new APIError('User role not properly configured.', INTERNAL_ERROR, 'Unauthorized'));
        }

        const isPermitted = user.role.some((role: Role) => permittedRoles.includes(role));
        if (!isPermitted) {
            return next(new APIError('Unauthorized, You are not permitted to access this!', UNAUTHORIZED, 'Unauthorized'));
        }

        next();
    };
};
