import winston, { LoggerOptions } from 'winston';
import { name, version } from '@root/package.json';

const loggerConfig: LoggerOptions = {
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: name, version },
  transports: [new winston.transports.Console()],
  silent: false,
};

const logger = winston.createLogger(loggerConfig);

export default logger;
