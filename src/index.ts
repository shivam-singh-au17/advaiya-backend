import { connectToDatabase } from './config/database';
import initializeDatabase from "./models/dbInitializer";
import { PORT } from './config/env';
import app from './app';

const startServer = async () => {
    try {

        // Start the server
        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        // Connect to the database
        await connectToDatabase();

        // Initialize all tables
        await initializeDatabase();

        // Graceful shutdown
        process.on('SIGTERM', () => {
            console.log('Received SIGTERM, shutting down gracefully');
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });

        process.on('SIGINT', () => {
            console.log('Received SIGINT, shutting down gracefully');
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });

    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

startServer();
