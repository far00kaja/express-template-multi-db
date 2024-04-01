const appRoot = require("app-root-path");
const winston = require("winston");
require("winston-daily-rotate-file");

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf((info) => {
      console.log(
        `[${info.timestamp}] ${info.level.toLowerCase()}: ${info.message}`
      );
      return `[${info.timestamp}] ${info.level.toLowerCase()}: ${info.message}`;
    })
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      createSymlink: true,
      symlinkName: "arvis.log",
      filename: "arvis-%DATE%.log",
      dirname: `${appRoot}/logs/`,
      datePattern: "YYYY-MM-DD_HH",
      level: "info",
      handleExceptions: true,
      json: true,
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;
