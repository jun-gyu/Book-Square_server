const express = require("express");
const router = express.Router();
const Report = require("../../models/Report");
const MyLibrary = require("../../models/Mylibrary");
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
      ? res.status(200).send({ message: "empty Library" })
      : res.status(200).json(docs);
  });
});

router.post("/addBooks", checkAuthToken, async (req, res) => {
  const { user_id } = req.user;
  const { bookUuid, bookTitle, bookAuthor, bookImage, bookRate } = req.body;

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
});

// myLibrary book delete
router.post("/deleteBooks", checkAuthToken, async (req, res) => {
  const { bookUuid } = req.body;
  //bookUuid 에 맞는 ref 북 리스트를 삭제한다.
  await MyLibrary.findOneAndRemove({ bookUuid: bookUuid }, (err) => {
    if (err) return res.status(401).send(err);
  });
  await Report.findOneAndRemove({ bookUuid: bookUuid }, (err) => {
    if (err) return res.status(401).send(err);
    res.status(200).send(`delete reportBooks & books success`);
  });
});

module.exports = router;
