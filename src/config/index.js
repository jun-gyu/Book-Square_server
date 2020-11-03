const dotenv = require('dotenv')
dotenv.config()
// const path = require("path");
// global.$require = pathname => require(path.join(__dirname, "../" + pathname));

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT || 4000,
  mongodb : {
    URL: process.env.MONGODB_URI,
  }
 ,
  naver_API:{
    clientId: process.env.CLIENT_ID, 
    clientSecret : process.env.CLIENT_SECRET
  },
  SECRET_KEY = process.env.SECRET_KEY
}