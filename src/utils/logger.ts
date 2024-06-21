import { createLogger, format, transports } from 'winston';
import { LOG_LEVEL, LOG_FILE_PATH } from '../config/env';

const { combine, timestamp, printf, errors } = format;

// custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

// logger instance
const logger = createLogger({
    level: LOG_LEVEL,
    format: combine(
        timestamp(),
        errors({ stack: true }),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: LOG_FILE_PATH })
    ]
});

function logError(err: Error): void {
    logger.error(err);
}

export { logError, logger };
