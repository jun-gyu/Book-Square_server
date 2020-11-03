const Logger = require("./logger");
const connect = require("./mongodb");
const expressLoader = require("./express");

module.exports = async (app) => {
  connect();
  Logger.info("DB loaded and connected");
  expressLoader(app);
  Logger.info("Express loaded");
};
