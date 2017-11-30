const winston = require('winston');
const fs = require('fs');
const logDir = 'log';
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleTimeString();

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            timestamp: tsFormat,
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        }),
        new winston.transports.Console({
            timestamp: tsFormat,
            level: 'info',
            handleExceptions: true,
            json: false,
            colorize: true,
        }),
        new winston.transports.File({
            filename: `${logDir}/analytics.log`,
            timestamp: tsFormat,
            level: 'info'
        }),
        new winston.transports.File({
            filename: `${logDir}/errors.log`,
            timestamp: tsFormat,
            level: 'error'
        })

    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: `${logDir}/exceptions.log`,
        })
    ]
});

module.exports = logger;