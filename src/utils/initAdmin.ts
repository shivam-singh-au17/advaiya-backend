import Account from '../models/Account';
import { generateSalt, generatePassword } from './index';
import { roles } from './roles';
import { AccountRepository } from "../repositories/account-repository";
import { sendEmail } from '../utils/emailService';

const repository = new AccountRepository();

const createAdmin = async (): Promise<void> => {
    const payload = {
        first_name: "Shivam",
        last_name: "Shivam",
        phone: "6306518466",
        email: "shivamsingh4458@gmail.com",
        birthday: "1998-07-12",
        role: [roles.ADMIN]
    }

    try {
        const admin = await repository.findAccount({ email: payload.email });

        const salt = await generateSalt();
        const userPassword = await generatePassword("Singh@12345", salt);

        if (!admin) {
            const accountRecord = await repository.createFirebaseUser(payload.email, userPassword);
            const account = await Account.create({ firebaseUid: accountRecord.uid, password: userPassword, salt, ...payload });
            console.log('Admin user created');

            sendEmail(account.email, `Your Account Has Been Created, ${account.first_name}!`, 'account-template', {
                first_name: account.first_name,
                last_name: account.last_name,
                email: account.email,
                phone: account.phone,
            });

        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error('Error creating admin:', error);
    }
};

export default createAdmin;
