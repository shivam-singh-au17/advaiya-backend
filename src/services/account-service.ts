import { AccountRepository } from "../repositories/account-repository";
import { formatData, generatePassword, generateSalt, validatePassword } from '../utils';
import { generateToken } from '../utils/jwt';
import { NotFoundError, ValidationError } from '../utils/errors';
import { AccountInstance } from "../models/Account";
import { roles } from '../utils/roles';
import { sendEmail } from '../utils/emailService';

class AccountService {
    private repository: AccountRepository;

    constructor() {
        this.repository = new AccountRepository();
    }

    async signUp(accountInputs: Partial<AccountInstance>) {
        const { first_name, last_name, email, phone, birthday, password } = accountInputs;

        const existingAccountFb = await this.repository.findFirebaseUserByEmail(email!);
        if (existingAccountFb) throw new ValidationError('User already registered');
        const existingAccountDb = await this.repository.findAccount({ email });
        if (existingAccountDb) throw new ValidationError('User already registered');

        const salt = await generateSalt();
        const accountPassword = await generatePassword(password!, salt);

        const accountRecord = await this.repository.createFirebaseUser(email!, accountPassword);

        const account = await this.repository.createAccount({
            first_name,
            last_name,
            email,
            phone,
            birthday,
            password: accountPassword,
            firebaseUid: accountRecord.uid,
            salt,
            role: [roles.USER]
        });

        const token = generateToken({
            id: account.id,
            firebaseUid: account.firebaseUid,
            email: account.email,
            phone: account.phone,
            role: account.role
        });

        await sendEmail(account.email, `Your Account Has Been Created, ${account.first_name}!`, 'account-template', {
            first_name: account.first_name,
            last_name: account.last_name,
            email: account.email,
            phone: account.phone,
        });

        return formatData({ user: account, token });
    }

    async signIn(accountInputs: Partial<AccountInstance>) {
        const { email, password } = accountInputs;

        const existingAccountFb = await this.repository.findFirebaseUserByEmail(email!);
        if (!existingAccountFb) throw new NotFoundError('User not found in Firebase');

        const existingAccountDb = await this.repository.findAccount({ firebaseUid: existingAccountFb.uid });
        if (!existingAccountDb) throw new NotFoundError('User not found in database');

        const validPassword = await validatePassword(password!, existingAccountDb.password, existingAccountDb.salt);
        if (!validPassword) throw new ValidationError('Invalid credentials');

        const token = generateToken({
            id: existingAccountDb.id,
            firebaseUid: existingAccountDb.firebaseUid,
            email: existingAccountDb.email,
            phone: existingAccountDb.phone,
            role: existingAccountDb.role
        });

        return formatData({ user: existingAccountDb, token });
    }

    async getAccount(accountId: number) {
        const existingAccount = await this.repository.findAccountById(accountId);
        if (!existingAccount) throw new NotFoundError('Account not found');

        return formatData(existingAccount);
    }

    async updateAccount(accountInputs: { id: number, account: Partial<AccountInstance> }) {
        const { id, account } = accountInputs;
        account.last_modified = new Date();
        const updatedAccount = await this.repository.updateAccount(id, account);
        if (!updatedAccount) throw new NotFoundError('Account not found');

        return formatData(updatedAccount);
    }

    async deleteAccount(accountId: number) {
        const deletedAccount = await this.repository.deleteAccount(accountId);
        if (!deletedAccount) throw new NotFoundError('Account not found');

        await this.repository.deleteFirebaseUser(deletedAccount.firebaseUid);

        return formatData({ message: "Account deleted successfully" });
    }

    async getAllAccounts(options: { page: number, limit: number, sortBy: string, sortOrder: string, search: string }) {
        const accounts = await this.repository.getAllAccounts(options);
        return formatData(accounts);
    }

}

export { AccountService };
