const winston = require('winston');
winston.exceptions
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        }),
        new winston.transports.File({filename: './logs/error.log', level: 'error'}),
        new winston.transports.File({filename: './logs/info.log'}),

    ],
    exceptionHandlers: [
        new winston.transports.File({filename: './logs/exceptions.log'})
    ]
});

module.exports = logger;