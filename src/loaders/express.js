const users = require("../api/routes/users");
const myLibrary = require("../api/routes/myLibrary");
const report = require("../api/routes/report");
const categorySearch = require("../api/routes/categorySearch");

const bodyParser = require("body-parser");
const passport = require("passport");

const cors = require("cors");
const morgan = require("morgan");
const config = require("../config/index");

module.exports = (app) => {
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

  app.use("/users", users);
  app.use("/myLibrary", myLibrary);
  app.use("/report", report);
  app.use("/categorySearch", categorySearch);

  // 패스포트 모듈 설정
  require("../api/middleware/passport")(passport);
};
