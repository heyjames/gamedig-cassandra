const { format, createLogger, transports } = require("winston");
const { timestamp, prettyPrint, json } = format;

const logger = createLogger({
  format: format.combine(
    timestamp({ format: "YYYY-MM-DD hh:mm:ssa" }),
    json()
    // prettyPrint()
  ),
  // transports: [
  // new transports.Console({ colorize: true, prettyPrint: true }),
  // new transports.File({ filename: "log.log" }),
  // ],
  exceptionHandlers: [
    // new transports.Console({ colorize: true, prettyPrint: true }),
    new transports.File({ filename: "exceptions.log" }),
  ],
});

module.exports = {
  logger,
};
