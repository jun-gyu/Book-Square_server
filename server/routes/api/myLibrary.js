const express = require("express");
const router = express.Router();
const Report = require("../../models/Report");
const MyLibrary = require("../../models/MyLibrary");
const Users = require("../../models/User");
const { checkAuthToken } = require("../../middleware/auth");
/*
 * myLibrary/getAllBooks
 */

router.get("/getAllBooks", checkAuthToken, async (req, res) => {
  const { user_id } = req.user;

  await MyLibrary.find({ user: user_id }, { __v: 0 }, (err, docs) => {
    if (err) return res.status(404).send(err); //서버는 요청받은 리소스를 찾을 수 없습니다
    !docs.length
      ? res.status(200).send(null) // 클라이언트에 null을 보내야하기에.
      : res.status(200).json(docs);
  });
});

router.post("/addBooks", checkAuthToken, async (req, res) => {
  const { user_id } = req.user;
  const { bookUuid, bookTitle, bookAuthor, bookImage, bookRate } = req.body;
  const isExist = await MyLibrary.findOne({ bookTitle: bookTitle });

  if (!isExist) {
    const userId = await Users.findOne({ _id: user_id });
    const myLibrary = await new MyLibrary({
      bookUuid: bookUuid,
      bookTitle: bookTitle,
      bookAuthor: bookAuthor[0],
      bookImage: bookImage,
      bookRate: bookRate,
      user: userId,
    });
    await myLibrary.save((err) => {
      if (err) {
        return res.status(400).send({ message: "didn't save your books" });
      }
      res.status(200).send({ message: "success added your books on DB" });
    });
  } else {
    return res.status(404).send({ message: "이미 있는 책 정보 입니다." });
  }
});

// myLibrary book delete
router.delete("/deleteBooks", checkAuthToken, async (req, res) => {
  const { bookUuid } = req.body;
  //bookUuid 에 맞는 ref 북 리스트를 삭제한다.
  await MyLibrary.findOneAndRemove({ bookUuid: bookUuid }, (err) => {
    if (err) return res.status(404).send(err);
  });
  await Report.findOneAndRemove({ bookUuid: bookUuid }, (err) => {
    if (err) return res.status(404).send(err);
    res.status(200).send({ message: "success deleted the book and report" });
  });
});

module.exports = router;
