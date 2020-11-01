// 모듈 로드
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");
const PORT = require("./config/keys").PORT;
const connect = require("./config/db");
// 초기화 파트
const app = express();
const users = require("./routes/api/users");
const myLibrary = require("./routes/api/myLibrary");
const report = require("./routes/api/report");
const categorySearch = require("./routes/api/categorySearch");
// 미들웨어 설정 파트
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: [`http://localhost:${PORT}`, "http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(passport.initialize());
//몽고디비 실행
connect();
// 패스포트 모듈 설정
require("./config/passport")(passport);
//morgan (postman)
app.use(morgan("dev"));
// 라우팅 파트
app.use("/users", users);
app.use("/myLibrary", myLibrary);
app.use("/report", report);
app.use("/categorySearch", categorySearch);
// 서버 실행
app.listen(PORT, (req, res) => {
  console.log(`서버 실행중..in port ${PORT}`);
});
