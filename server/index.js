// 모듈 로드
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");
const PORT = require("./config/keys").PORT;
// 초기화 파트
const app = express();
const users = require("./routes/api/users");
const myLibrary = require("./routes/api/myLibrary");
// 미들웨어 설정 파트
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: [`http://localhost:${PORT}`, "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(passport.initialize());

// 몽고DB 설정 파트
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true }, { useUnifiedTopology: true }) //useUnifiedTopology 이건 뭐지
  .then(() => console.log("몽고 DB가 연결되었습니다."))
  .catch((err) => console.log(err));

// 패스포트 모듈 설정
require("./config/passport")(passport);

//morgan (postman)
app.use(morgan("dev"));
// 라우팅 파트
app.use("/users", users);
app.use("/myLibrary", myLibrary);

// 서버 실행
app.listen(PORT, (req, res) => {
  console.log(`서버 실행중..in port ${PORT}`);
});
