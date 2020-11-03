const express = require("express");
const Logger = require("./loaders/logger");
const loader = require("./loaders/index");
const config = require("./config/index");

function startServer() {
  const app = express();
  loader(app);
  app.listen(config.port, (err) => {
    if (err) {
      Logger.error(err);
    }
    Logger.info(`
         Server listening on port: ${config.port} 
        `);
  });

  module.exports = app;
}
startServer();
