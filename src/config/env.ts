import dotenv from 'dotenv';
import path from 'path';

type EnvVars = {
    PORT: string;
    JWT_SECRET: string;
    DATABASE_URL: string;
    EMAIL_USER: string;
    EMAIL_PASS: string;
    NODE_ENV: string;
    DB_POOL_MAX: string;
    DB_POOL_MIN: string;
    DB_POOL_ACQUIRE: string;
    DB_POOL_IDLE: string;
    DB_USE_SSL: string;
    LOG_FILE_PATH: string;
    LOG_LEVEL: string;
};

// Load .env.development in development, .env in production
const envFile: string = process.env.NODE_ENV !== 'prod' ? '.env.dev' : '.env';
dotenv.config({ path: path.join(__dirname, '../../', envFile) });

function loadEnvVars(): EnvVars {
    const requiredVars: (keyof EnvVars)[] = [
        'JWT_SECRET',
        'DATABASE_URL',
        'EMAIL_USER',
        'EMAIL_PASS'
    ];
    const envVars: Partial<EnvVars> = {};

    requiredVars.forEach(varName => {
        const value = process.env[varName];
        if (!value) {
            throw new Error(`${varName} is not defined in the environment variables.`);
        }
        envVars[varName] = value;
    });

    return envVars as EnvVars;
}

const config = loadEnvVars();

export const {
    PORT = '7070',
    JWT_SECRET,
    DATABASE_URL,
    EMAIL_USER,
    EMAIL_PASS,
    NODE_ENV = 'development',
    DB_POOL_MAX = '5',
    DB_POOL_MIN = '0',
    DB_POOL_ACQUIRE = '30000',
    DB_POOL_IDLE = '10000',
    DB_USE_SSL = 'false',
    LOG_FILE_PATH = 'logs/app_error.log',
    LOG_LEVEL = 'info'
} = config;
