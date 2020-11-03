const config = require('./config/index')
const express = require('express');
const Logger = require('./loaders/logger')
const loader = require('./loaders/index')



function startServer(){
  console.log("hello my love")
    const app = express();
    console.log("hello my love1")
    loader(app)
    console.log("hello my love2")
    app.listen(config.port, err => {
      console.log("hello my love3")
        if (err) {
          Logger.error(err);
        }
        Logger.info(`
         Server listening on port: ${config.port} 
        `);
      });
      console.log("hello my love4")
     
     module.exports = app 
}
startServer()