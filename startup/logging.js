const { logger } = require("../utils/logger");

module.exports = () => {
  process.on("uncaughtException", (ex) => {
    logger.info("Uncaught Exception:", ex);
    // console.error("Uncaught Exception:", ex);
    // process.exit(1);
  });

  process.on("unhandledRejection", (ex) => {
    logger.info("Unhandled Rejection");
    // console.error("Unhandled Rejection");
    // throw new Error("Unhandled Rejection");
    // process.exit(1);
    throw ex;
  });
};
