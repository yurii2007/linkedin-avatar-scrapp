import winston from 'winston';

const { printf, timestamp, combine } = winston.format;
const { File } = winston.transports;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp}-[${level}]: ${message}`;
});

const loggerFile = new File({ filename: 'out.log' });

const logger = winston.createLogger({
  format: combine(timestamp(), customFormat),
  transports: [loggerFile],
});

export default logger;
