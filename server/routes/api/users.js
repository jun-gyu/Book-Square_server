const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const { makeToken } = require("../../middleware/auth");
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
            .then((user) => res.status(200).json(user))
            .catch((err) => console.log(err));
        });
      });
    }
    return;
  });
});

router.post("/signIn", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // email로 회원 찾기
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(401).send({ message: "user is not exist" }); // Unauthorized
    }

    // 패스워드 확인
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // 회원 비밀번호가 일치할 때
        // JWT PAYLOAD 생성
        const payload = {
          user_id: user.id,
          name: user.name,
        };

        // JWT 토큰 생성
        const bearerToken = makeToken(payload);
        res.json({
          name: user.name,
          email: user.email,
          token: bearerToken,
        });
      } else {
        return res
          .status(401)
          .send({ message: "please check your email or password" }); // 잘못된 인증정보
      }
    });
  });
});

module.exports = router;
