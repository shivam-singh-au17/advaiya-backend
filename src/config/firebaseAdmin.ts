import admin from 'firebase-admin';
import path from 'path';
import { ServiceAccount } from 'firebase-admin';

const loadServiceAccount = (): ServiceAccount => {
    try {
        const serviceAccount = require(path.join(__dirname, '../../firebase-admin-key.json')) as ServiceAccount;
        return serviceAccount;
    } catch (error) {
        console.error('Error loading Firebase service account:', error);
        throw error;
    }
};

export const initializeFirebase = (serviceAccount: ServiceAccount): void => {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log('Firebase initialized successfully.');
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        throw error;
    }
};

const serviceAccount = loadServiceAccount();
initializeFirebase(serviceAccount);

export default admin;
