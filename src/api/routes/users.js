const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const { makeToken, checkAuthToken } = require("../middleware/auth");

router.post("/signUp", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(409).json({ code: 409, message: "the user already exist" }); // conflict
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          //throw 는 프로그램을 멈추게 한다.
          newUser.password = hash;

          newUser
            .save()
            .then((user) => res.status(200).json(user))
            .catch((err) => console.error(err));
        });
      });
    }
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/signIn", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    // email로 회원 찾기
    const user = await User.findOne({ email });
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
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/modifyName", checkAuthToken, async (req, res) => {
  const { user_id } = req.user;
  const modifyName = req.body.name;
  try {
    const user = await User.findOneAndUpdate(
      { _id: user_id },
      { name: modifyName }
    );
    if (user === null) {
      res.status(404).json({ code: 404, message: `can not found user` });
    } else {
      res.status(200).json({ code: 200, message: `modify userName success` });
    }
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
