const winston = require("winston");

const logger = winston.createLogger({
    format: winston.format.json()
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.json(),
    }));
} else {
    logger.add([
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log', level: 'info' })
    ]);
}

module.exports = logger;