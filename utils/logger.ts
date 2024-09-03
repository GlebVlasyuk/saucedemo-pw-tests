import * as log4js from "log4js";
log4js.configure({
  appenders: { cheese: { type: "file", filename: "tests.log" } },
  categories: { default: { appenders: ["cheese"], level: "error" } },
});
const logger = log4js.getLogger();
logger.level = "error";

export {logger};