import { Request, Response, NextFunction } from 'express';
import { AccountService } from "../services/account-service";
import asyncHandler from "../utils/async-handler";

const service = new AccountService();

export const signUp = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { first_name, last_name, email, phone, birthday, password } = req.body;
    const { data } = await service.signUp({ first_name, last_name, email, phone, birthday, password });
    return res.json(data);
});

export const signIn = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const { data } = await service.signIn({ email, password });
    return res.json(data);
});

export const getAccount = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { accountId } = req.params;
    const { data } = await service.getAccount(Number(accountId));
    return res.json(data);
});

export const updateAccount = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;
    const { first_name, last_name, phone, birthday } = req.body;
    const { data } = await service.updateAccount({ id: Number(id), account: { first_name, last_name, phone, birthday } });
    return res.json(data);
});

export const deleteAccount = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { accountId } = req.params ;
    const { data } = await service.deleteAccount(Number(accountId));
    return res.json(data);
});

export const getAllAccounts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { page, limit, sortBy, sortOrder, search } = req.query;
    const paginationOptions = {
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        sortBy: sortBy as string || "created_at",
        sortOrder: sortOrder as string || "DESC",
        search: search as string || ""
    };
    const { data } = await service.getAllAccounts(paginationOptions);
    return res.json(data);
});
