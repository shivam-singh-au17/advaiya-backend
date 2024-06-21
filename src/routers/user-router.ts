import express from 'express';
import {
    signUp,
    signIn
} from '../controllers/account-controller';
import { validate } from '../middlewares/validate';
import {
    signUpSchema,
    signInSchema,
} from '../validation/account-validation';

const router = express.Router();

router.post('/signup', validate(signUpSchema), signUp);
router.post('/login', validate(signInSchema), signIn);

export default router;
