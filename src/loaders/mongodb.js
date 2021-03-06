const mongoose = require("mongoose");
const MONGO_URI = require("../config/index").mongodb;
const connect = () => {
  mongoose.connect(
    MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (error) => {
      if (error) {
        console.log(`몽고디비 연결 에러 `, err);
      } else {
        console.log(`몽고디비 연결 성공`);
      }
    }
  );
};
mongoose.connection.on("error", (error) => {
  console.error(`몽고디비 연결 에러 `, error);
});

mongoose.connection.on(`disconnected`, () => {
  console.error(`몽고디비 연결이 끊켰습니다. 연결을 재시도 합니다.`);
  connect();
});

module.exports = connect;
