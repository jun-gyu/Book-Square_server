var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const bcrypt = require("bcryptjs");

const User = require("../../models/User");

router.get("/", (req, res) => {
  res.send("패스포트 모듈 테스트");
});

router.post("/signUp", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(409).send(); // conflict
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;

          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
      return res.status(200).send();
    }
  });
});

router.post("/signIn", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // email로 회원 찾기
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(401).send(); // Unauthorized
    }

    // 패스워드 확인
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // 회원 비밀번호가 일치할 때
        // JWT PAYLOAD 생성
        const payload = {
          id: user.id,
          name: user.name,
        };

        // JWT 토큰 생성
        // 1시간 동안 유효
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              name: user.name,
              email: user.email,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(401).send(); // 잘못된 인증정보
      }
    });
  });
});

router.get('/loggedInUserInfo', passport.authenticate('jwt', { session: false}), (req, res) => {
  res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
  });
});

module.exports = router;
