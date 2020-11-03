const express = require("express");
const router = express.Router();
const Report = require("../../models/Report");
const MyLibrary = require("../../models/MyLibrary");
const User = require("../../models/User");
const { checkAuthToken } = require("../middleware/auth");
/*
 * myLibrary/getAllBooks
 */

router.get("/getAllBooks", checkAuthToken, async (req, res) => {
  const { user_id } = req.user;
  try {
    const myLibrary = await MyLibrary.find({ user: user_id }, { __v: 0 });
    if (myLibrary.length) {
      res.status(200).json(docs);
    } else {
      res.status(204).send(null); // 클라이언트에 null을 보내야하기에.
    }
  } catch (err) {
    console.error(err);
  }
});

router.post("/addBooks", checkAuthToken, async (req, res) => {
  const { user_id } = req.user;
  const { bookUuid, bookTitle, bookAuthor, bookImage, bookRate } = req.body;

  try {
    const isExist = await MyLibrary.findOne({ bookTitle: bookTitle });
    if (!isExist) {
      const userId = await User.findOne({ _id: user_id });
      const myLibrary = await new MyLibrary({
        bookUuid: bookUuid,
        bookTitle: bookTitle,
        bookAuthor: bookAuthor[0],
        bookImage: bookImage,
        bookRate: bookRate,
        user: userId,
      });
      myLibrary.save((err) => {
        if (err) {
          return res.status(400).json({
            code: 400,
            message: "didn't save your books",
          });
        }
        res
          .status(200)
          .send({ code: 200, message: "success added your books on DB" });
      });
    } else {
      return res
        .status(403)
        .send({ code: 403, message: "이미 있는 책 정보 입니다." });
    }
  } catch (err) {
    console.error(err.message);
  }
});

// myLibrary book delete
router.post("/deleteBooks", checkAuthToken, async (req, res) => {
  const { bookUuid } = req.body;
  //bookUuid 에 맞는 ref 북 리스트를 삭제한다.
  try {
    const book = await MyLibrary.deleteOne({ bookUuid: bookUuid });
    const report = await Report.deleteMany({ bookUuid: bookUuid });
    //book.deletedCount 는 실 데이터가 삭제 되었을시 1 (true)을(를) 반환함.
    if (!book.deletedCount && !report.deletedCount) {
      res.status(404).json({
        code: 404,
        message: "can not found your book & report",
      });
    } else {
      res
        .status(200)
        .json({ code: 200, message: "success delete report & book" });
    }
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
