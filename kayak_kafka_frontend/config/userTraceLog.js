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
            level: 'info',
            handleExceptions: true,
            json: false,
            colorize: true,
        }),
        new winston.transports.File({
            timestamp: tsFormat,
            filename: `${logDir}/userTraceTree.log`,
            level: 'info'
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: `${logDir}/errors.log`,
        })
    ]
});

module.exports = logger;