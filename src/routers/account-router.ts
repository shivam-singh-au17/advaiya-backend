import express from 'express';
import {
    getAccount,
    deleteAccount,
    getAllAccounts,
    updateAccount
} from '../controllers/account-controller';
import { authenticate } from "../middlewares/auth";
import { authorize } from "../middlewares/authorization";
import { validate } from '../middlewares/validate';
import {
    getAllAccountSchema,
    updateAccountSchema,
    accountIdSchema
} from '../validation/account-validation';
import permittedRoles from "../utils/apisPermittedRoles";

const router = express.Router();

router.get('/:accountId', authenticate, validate(accountIdSchema), authorize(permittedRoles.USER.GET_ACCOUNT), getAccount);
router.get('/', authenticate, validate(getAllAccountSchema), authorize(permittedRoles.USER.GET_ACCOUNTS), getAllAccounts);

router.put('/', authenticate, validate(updateAccountSchema), authorize(permittedRoles.USER.UPDATE_ACCOUNT), updateAccount);

router.delete('/:accountId', authenticate, validate(accountIdSchema), authorize(permittedRoles.USER.DELETE_ACCOUNT), deleteAccount);

export default router;
