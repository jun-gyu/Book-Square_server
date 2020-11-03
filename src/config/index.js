const dotenv = require("dotenv");
dotenv.config();
// const path = require("path");
// global.$require = pathname => require(path.join(__dirname, "../" + pathname));

const getDbUrl = ({ DB_USER, DB_PWD, DB_NAME }) => {
  if (DB_USER && DB_PWD) {
    return `mongodb+srv://${DB_USER}:${DB_PWD}@cluster0.i6yar.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
  }
};

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT || 4000,
  mongodb: getDbUrl(process.env),
  naver_API: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  },
  SECRET_KEY: process.env.SECRET_KEY,
};
