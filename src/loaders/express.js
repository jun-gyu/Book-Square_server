// 모듈 로드
const bodyParser = require("body-parser");
const passport = require("../api/middleware/passport");
const cors = require("cors");
const morgan = require("morgan");
const config = require('../config/index')
// 초기화 파트
// 미들웨어 설정 파트
module.exports = app =>{
  console.log("i'm super express!!!!!!")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: [`http://localhost:${config.port}`, "http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(morgan("dev"));

// 패스포트 모듈 설정
require("../middleware/passport")(passport);
}


