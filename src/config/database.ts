import { Sequelize } from 'sequelize';
import { DATABASE_URL, NODE_ENV, DB_POOL_MAX, DB_POOL_MIN, DB_POOL_ACQUIRE, DB_POOL_IDLE, DB_USE_SSL } from './env';

// Create a new Sequelize instance with additional configuration options
const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    logging: NODE_ENV === 'development' ? console.log : false,
    pool: {
        max: parseInt(DB_POOL_MAX, 10),
        min: parseInt(DB_POOL_MIN, 10),
        acquire: parseInt(DB_POOL_ACQUIRE, 10),
        idle: parseInt(DB_POOL_IDLE, 10),
    },
    dialectOptions: {
        ssl: DB_USE_SSL === 'true' ? { require: true, rejectUnauthorized: false } : false,
    },
});

export const connectToDatabase = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log("Connected to the database...");
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error connecting to the database:", error.message);
        } else {
            console.error("Unexpected error:", error);
        }
        throw new Error("Unable to connect to the database.");
    }
};

export default sequelize;
